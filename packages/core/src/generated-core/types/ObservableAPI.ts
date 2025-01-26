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
    public deleteAlbumWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<AlbumSongListResponse>> {
        const requestContextPromise = this.requestFactory.deleteAlbum(cid, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteAlbumWithHttpInfo(rsp)));
            }));
    }

    /**
     * 指定したアルバムをファイルシステム上から削除する
     * @param cid アルバムの cid
     */
    public deleteAlbum(cid: string, _options?: Configuration): Observable<AlbumSongListResponse> {
        return this.deleteAlbumWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<AlbumSongListResponse>) => apiResponse.data));
    }

    /**
     * 指定したアルバムの楽曲すべてのダウンロードを開始する
     * @param cid アルバムの cid
     */
    public fetchAlbumSongsWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<FetchAlbumResponse>> {
        const requestContextPromise = this.requestFactory.fetchAlbumSongs(cid, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.fetchAlbumSongsWithHttpInfo(rsp)));
            }));
    }

    /**
     * 指定したアルバムの楽曲すべてのダウンロードを開始する
     * @param cid アルバムの cid
     */
    public fetchAlbumSongs(cid: string, _options?: Configuration): Observable<FetchAlbumResponse> {
        return this.fetchAlbumSongsWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<FetchAlbumResponse>) => apiResponse.data));
    }

    /**
     * 指定したアルバムの楽曲一覧を取得
     * @param cid アルバムの cid
     */
    public getAlbumSongsWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<AlbumSongListResponse>> {
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
     * 指定したアルバムの楽曲一覧を取得
     * @param cid アルバムの cid
     */
    public getAlbumSongs(cid: string, _options?: Configuration): Observable<AlbumSongListResponse> {
        return this.getAlbumSongsWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<AlbumSongListResponse>) => apiResponse.data));
    }

    /**
     * アルバムの一覧を取得
     */
    public getAlbumsWithHttpInfo(_options?: Configuration): Observable<HttpInfo<AlbumListResponse>> {
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
     * アルバムの一覧を取得
     */
    public getAlbums(_options?: Configuration): Observable<AlbumListResponse> {
        return this.getAlbumsWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<AlbumListResponse>) => apiResponse.data));
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
    public deleteSongWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<SongStatusResponse>> {
        const requestContextPromise = this.requestFactory.deleteSong(cid, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteSongWithHttpInfo(rsp)));
            }));
    }

    /**
     * 指定した楽曲をファイルシステム上から削除する
     * @param cid 楽曲の cid
     */
    public deleteSong(cid: string, _options?: Configuration): Observable<SongStatusResponse> {
        return this.deleteSongWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<SongStatusResponse>) => apiResponse.data));
    }

    /**
     * 指定した楽曲のダウンロードを開始する
     * @param cid 楽曲の cid
     */
    public fetchSongWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<FetchSongResponse>> {
        const requestContextPromise = this.requestFactory.fetchSong(cid, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.fetchSongWithHttpInfo(rsp)));
            }));
    }

    /**
     * 指定した楽曲のダウンロードを開始する
     * @param cid 楽曲の cid
     */
    public fetchSong(cid: string, _options?: Configuration): Observable<FetchSongResponse> {
        return this.fetchSongWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<FetchSongResponse>) => apiResponse.data));
    }

    /**
     * 指定した楽曲の状態を取得
     * @param cid 楽曲の cid
     */
    public getSongStatusWithHttpInfo(cid: string, _options?: Configuration): Observable<HttpInfo<SongStatusResponse>> {
        const requestContextPromise = this.requestFactory.getSongStatus(cid, _options);

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
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getSongStatusWithHttpInfo(rsp)));
            }));
    }

    /**
     * 指定した楽曲の状態を取得
     * @param cid 楽曲の cid
     */
    public getSongStatus(cid: string, _options?: Configuration): Observable<SongStatusResponse> {
        return this.getSongStatusWithHttpInfo(cid, _options).pipe(map((apiResponse: HttpInfo<SongStatusResponse>) => apiResponse.data));
    }

}
