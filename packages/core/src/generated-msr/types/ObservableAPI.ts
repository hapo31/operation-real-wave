import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http.ts';
import { Configuration} from '../configuration.ts'
import { Observable, of, from } from '../rxjsStub.ts';
import {mergeMap, map} from  '../rxjsStub.ts';
import { MsrAlbumData } from '../models/MsrAlbumData.ts';
import { MsrAlbumDataResponse } from '../models/MsrAlbumDataResponse.ts';
import { MsrAlbumDetailResponse } from '../models/MsrAlbumDetailResponse.ts';
import { MsrAlbumDetails } from '../models/MsrAlbumDetails.ts';
import { MsrAlbumSummary } from '../models/MsrAlbumSummary.ts';
import { MsrAlbumsResponse } from '../models/MsrAlbumsResponse.ts';
import { MsrSong } from '../models/MsrSong.ts';
import { MsrSongDetailsResponse } from '../models/MsrSongDetailsResponse.ts';
import { MsrSongSummary } from '../models/MsrSongSummary.ts';

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
     * 指定したアルバムの楽曲を除いた詳細データを取得
     * @param cid アルバムの cid
     */
    public getAlbumDetailsWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<MsrAlbumDetailResponse>> {
        const requestContextPromise = this.requestFactory.getAlbumDetails(cid, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAlbumDetailsWithHttpInfo(rsp)));
            }));
    }

    /**
     * 指定したアルバムの楽曲を除いた詳細データを取得
     * @param cid アルバムの cid
     */
    public getAlbumDetails(cid: string, _options?: Configuration): Observable<MsrAlbumDetailResponse> {
        return this.getAlbumDetailsWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<MsrAlbumDetailResponse>) => apiResponse.data));
    }

    /**
     * 指定したアルバムの収録楽曲一覧を取得
     * @param cid アルバムの cid
     */
    public getAlbumSongsWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<MsrAlbumDetailResponse>> {
        const requestContextPromise = this.requestFactory.getAlbumSongs(cid, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAlbumSongsWithHttpInfo(rsp)));
            }));
    }

    /**
     * 指定したアルバムの収録楽曲一覧を取得
     * @param cid アルバムの cid
     */
    public getAlbumSongs(cid: string, _options?: Configuration): Observable<MsrAlbumDetailResponse> {
        return this.getAlbumSongsWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<MsrAlbumDetailResponse>) => apiResponse.data));
    }

    /**
     * リリース済みアルバムの一覧を取得
     */
    public getAlbumsWithHttpInfo(_options?: Configuration): Observable<HttpInfo<MsrAlbumsResponse>> {
        const requestContextPromise = this.requestFactory.getAlbums(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAlbumsWithHttpInfo(rsp)));
            }));
    }

    /**
     * リリース済みアルバムの一覧を取得
     */
    public getAlbums(_options?: Configuration): Observable<MsrAlbumsResponse> {
        return this.getAlbumsWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<MsrAlbumsResponse>) => apiResponse.data));
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
    public getSongDetailsWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<MsrSongDetailsResponse>> {
        const requestContextPromise = this.requestFactory.getSongDetails(cid, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getSongDetailsWithHttpInfo(rsp)));
            }));
    }

    /**
     * 指定した楽曲の詳細を取得
     * @param cid 楽曲の cid
     */
    public getSongDetails(cid: string, _options?: Configuration): Observable<MsrSongDetailsResponse> {
        return this.getSongDetailsWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<MsrSongDetailsResponse>) => apiResponse.data));
    }

}
