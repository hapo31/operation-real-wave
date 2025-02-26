/// <reference lib="deno.unstable" />

import { createConfiguration } from "./generated-msr/configuration.ts";
import { IsomorphicFetchHttpLibrary } from "./generated-msr/http/isomorphic-fetch.ts";
import { RequestContext, ResponseBody, ResponseContext, SongsApi } from "./generated-msr/index.ts";
import { AlbumApi, Configuration } from "./generated-msr/index.ts";
import { from } from "./generated-msr/rxjsStub.ts";
import { server1 } from "./generated-msr/servers.ts";

// const base = "https://monster-siren.hypergryph.com/api";

const fetchCacheKv = await Deno.openKv("./fetch-cache.db");

class CachedHttpLibrary extends IsomorphicFetchHttpLibrary {
  override send(request: RequestContext) {
    return from<Promise<ResponseContext>>(
      (async () => {
        const method = request.getHttpMethod();
        if (method !== "GET") {
          return super.send(request).toPromise();
        }
        const url = request.getUrl();

        if (url.endsWith("/albums")) {
          return super.send(request).toPromise();
        }
        const params = new URLSearchParams(url.substring(url.indexOf("?")));

        if (params.get("f")) {
          await fetchCacheKv.delete([url]);
        }

        const cacheResponse = await fetchCacheKv.get<HttpResponseInfo>([url]);
        if (cacheResponse.value) {
          const responseValue = cacheResponse.value;
          return new ResponseContext(
            200,
            { ...responseValue.headers, "x-operation-realwave-cache": "hit" },
            new ResponseBodyImpl(responseValue.body),
          );
        }

        const response = await super.send(request).toPromise();
        const body = await (await response.body.binary()).arrayBuffer();
        await fetchCacheKv.set(
          [url],
          {
            headers: response.headers,
            body,
          } satisfies HttpResponseInfo,
        );
        return new ResponseContext(
          response.httpStatusCode,
          response.headers,
          new ResponseBodyImpl(body),
        );
      })(),
    );
  }
}

const baseConfig: Configuration = createConfiguration({
  baseServer: server1, // 1は開発用
  httpApi: new CachedHttpLibrary(),
});

export function albumApi() {
  return new AlbumApi(baseConfig);
}

export function songApi() {
  return new SongsApi(baseConfig);
}

type HttpResponseInfo = { body: ArrayBuffer; headers: Record<string, string> };

class ResponseBodyImpl implements ResponseBody {
  #body: Blob;

  constructor(body: ArrayBuffer) {
    this.#body = new Blob([body]);
  }

  text() {
    return this.#body.text();
  }

  binary() {
    return Promise.resolve(this.#body);
  }
}
