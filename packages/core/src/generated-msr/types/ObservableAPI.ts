import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http.ts';
import { Configuration} from '../configuration.ts'
import { Observable, of, from } from '../rxjsStub.ts';
import {mergeMap, map} from  '../rxjsStub.ts';
import { AlbumDetailResponse } from '../models/AlbumDetailResponse.ts';
import { AlbumDetails } from '../models/AlbumDetails.ts';
import { AlbumSummary } from '../models/AlbumSummary.ts';
import { AlbumsResponse } from '../models/AlbumsResponse.ts';
import { Song } from '../models/Song.ts';
import { SongDetailsResponse } from '../models/SongDetailsResponse.ts';
import { SongSummary } from '../models/SongSummary.ts';

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
    public albumCidDetailGetWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<AlbumDetailResponse>> {
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
    public albumCidDetailGet(cid: string, _options?: Configuration): Observable<AlbumDetailResponse> {
        return this.albumCidDetailGetWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<AlbumDetailResponse>) => apiResponse.data));
    }

    /**
     * リリース済みアルバムの一覧を取得
     */
    public albumsGetWithHttpInfo(_options?: Configuration): Observable<HttpInfo<AlbumsResponse>> {
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
    public albumsGet(_options?: Configuration): Observable<AlbumsResponse> {
        return this.albumsGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<AlbumsResponse>) => apiResponse.data));
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
    public songCidGetWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<SongDetailsResponse>> {
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
    public songCidGet(cid: string, _options?: Configuration): Observable<SongDetailsResponse> {
        return this.songCidGetWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<SongDetailsResponse>) => apiResponse.data));
    }

}
