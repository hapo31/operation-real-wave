import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http.ts';
import { Configuration} from '../configuration.ts'
import { Observable, of, from } from '../rxjsStub.ts';
import {mergeMap, map} from  '../rxjsStub.ts';
import { AlbumCidDetailGet200Response } from '../models/AlbumCidDetailGet200Response.ts';
import { AlbumCidDetailGet200ResponseData } from '../models/AlbumCidDetailGet200ResponseData.ts';
import { AlbumCidDetailGet200ResponseDataSongsInner } from '../models/AlbumCidDetailGet200ResponseDataSongsInner.ts';
import { AlbumsGet200Response } from '../models/AlbumsGet200Response.ts';
import { AlbumsGet200ResponseDataInner } from '../models/AlbumsGet200ResponseDataInner.ts';
import { SongCidGet200Response } from '../models/SongCidGet200Response.ts';
import { SongCidGet200ResponseData } from '../models/SongCidGet200ResponseData.ts';

import { AlbumApiRequestFactory, AlbumApiResponseProcessor} from "../apis/AlbumApi.ts";
export class ObservableAlbumApi {
    private requestFactory: AlbumApiRequestFactory;
    private responseProcessor: AlbumApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: AlbumApiRequestFactory,
        responseProcessor?: AlbumApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new AlbumApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new AlbumApiResponseProcessor();
    }

    /**
     * 指定したアルバムの収録楽曲一覧を取得
     * @param cid アルバムの cid
     */
    public albumCidDetailGetWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<AlbumCidDetailGet200Response>> {
        const requestContextPromise = this.requestFactory.albumCidDetailGet(cid, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.albumCidDetailGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * 指定したアルバムの収録楽曲一覧を取得
     * @param cid アルバムの cid
     */
    public albumCidDetailGet(cid: string, _options?: Configuration): Observable<AlbumCidDetailGet200Response> {
        return this.albumCidDetailGetWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<AlbumCidDetailGet200Response>) => apiResponse.data));
    }

    /**
     * リリース済みアルバムの一覧を取得
     */
    public albumsGetWithHttpInfo(_options?: Configuration): Observable<HttpInfo<AlbumsGet200Response>> {
        const requestContextPromise = this.requestFactory.albumsGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.albumsGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * リリース済みアルバムの一覧を取得
     */
    public albumsGet(_options?: Configuration): Observable<AlbumsGet200Response> {
        return this.albumsGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<AlbumsGet200Response>) => apiResponse.data));
    }

}

import { SongsApiRequestFactory, SongsApiResponseProcessor} from "../apis/SongsApi.ts";
export class ObservableSongsApi {
    private requestFactory: SongsApiRequestFactory;
    private responseProcessor: SongsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: SongsApiRequestFactory,
        responseProcessor?: SongsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new SongsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new SongsApiResponseProcessor();
    }

    /**
     * 指定した楽曲の詳細を取得
     * @param cid 楽曲の cid
     */
    public songCidGetWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<SongCidGet200Response>> {
        const requestContextPromise = this.requestFactory.songCidGet(cid, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.songCidGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * 指定した楽曲の詳細を取得
     * @param cid 楽曲の cid
     */
    public songCidGet(cid: string, _options?: Configuration): Observable<SongCidGet200Response> {
        return this.songCidGetWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<SongCidGet200Response>) => apiResponse.data));
    }

}
