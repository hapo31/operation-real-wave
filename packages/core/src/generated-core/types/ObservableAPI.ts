import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http.ts';
import { Configuration} from '../configuration.ts'
import { Observable, of, from } from '../rxjsStub.ts';
import {mergeMap, map} from  '../rxjsStub.ts';
import { Album } from '../models/Album.ts';
import { AlbumListResponse } from '../models/AlbumListResponse.ts';
import { AlbumSongListResponse } from '../models/AlbumSongListResponse.ts';
import { AlbumSummary } from '../models/AlbumSummary.ts';
import { FetchAlbumResponse } from '../models/FetchAlbumResponse.ts';
import { FetchSongResponse } from '../models/FetchSongResponse.ts';
import { FileStatus } from '../models/FileStatus.ts';
import { Song } from '../models/Song.ts';
import { SongStatusResponse } from '../models/SongStatusResponse.ts';

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
     * 指定したアルバムをファイルシステム上から削除する
     * @param cid アルバムの cid
     */
    public albumCidDeleteWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<AlbumSongListResponse>> {
        const requestContextPromise = this.requestFactory.albumCidDelete(cid, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.albumCidDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * 指定したアルバムをファイルシステム上から削除する
     * @param cid アルバムの cid
     */
    public albumCidDelete(cid: string, _options?: Configuration): Observable<AlbumSongListResponse> {
        return this.albumCidDeleteWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<AlbumSongListResponse>) => apiResponse.data));
    }

    /**
     * 指定したアルバムの楽曲一覧を取得
     * @param cid アルバムの cid
     */
    public albumCidGetWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<AlbumSongListResponse>> {
        const requestContextPromise = this.requestFactory.albumCidGet(cid, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.albumCidGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * 指定したアルバムの楽曲一覧を取得
     * @param cid アルバムの cid
     */
    public albumCidGet(cid: string, _options?: Configuration): Observable<AlbumSongListResponse> {
        return this.albumCidGetWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<AlbumSongListResponse>) => apiResponse.data));
    }

    /**
     * 指定したアルバムの楽曲すべてのダウンロードを開始する
     * @param cid アルバムの cid
     */
    public albumCidPostWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<FetchAlbumResponse>> {
        const requestContextPromise = this.requestFactory.albumCidPost(cid, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.albumCidPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * 指定したアルバムの楽曲すべてのダウンロードを開始する
     * @param cid アルバムの cid
     */
    public albumCidPost(cid: string, _options?: Configuration): Observable<FetchAlbumResponse> {
        return this.albumCidPostWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<FetchAlbumResponse>) => apiResponse.data));
    }

    /**
     * アルバムの一覧を取得
     */
    public albumsGetWithHttpInfo(_options?: Configuration): Observable<HttpInfo<AlbumListResponse>> {
        const requestContextPromise = this.requestFactory.albumsGet(_options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.albumsGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * アルバムの一覧を取得
     */
    public albumsGet(_options?: Configuration): Observable<AlbumListResponse> {
        return this.albumsGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<AlbumListResponse>) => apiResponse.data));
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
     * 指定した楽曲をファイルシステム上から削除する
     * @param cid 楽曲の cid
     */
    public songCidDeleteWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<SongStatusResponse>> {
        const requestContextPromise = this.requestFactory.songCidDelete(cid, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.songCidDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * 指定した楽曲をファイルシステム上から削除する
     * @param cid 楽曲の cid
     */
    public songCidDelete(cid: string, _options?: Configuration): Observable<SongStatusResponse> {
        return this.songCidDeleteWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<SongStatusResponse>) => apiResponse.data));
    }

    /**
     * 指定した楽曲の状態を取得
     * @param cid 楽曲の cid
     */
    public songCidGetWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<SongStatusResponse>> {
        const requestContextPromise = this.requestFactory.songCidGet(cid, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.songCidGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * 指定した楽曲の状態を取得
     * @param cid 楽曲の cid
     */
    public songCidGet(cid: string, _options?: Configuration): Observable<SongStatusResponse> {
        return this.songCidGetWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<SongStatusResponse>) => apiResponse.data));
    }

    /**
     * 指定した楽曲のダウンロードを開始する
     * @param cid 楽曲の cid
     */
    public songCidPostWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<FetchSongResponse>> {
        const requestContextPromise = this.requestFactory.songCidPost(cid, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.songCidPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * 指定した楽曲のダウンロードを開始する
     * @param cid 楽曲の cid
     */
    public songCidPost(cid: string, _options?: Configuration): Observable<FetchSongResponse> {
        return this.songCidPostWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<FetchSongResponse>) => apiResponse.data));
    }

}
