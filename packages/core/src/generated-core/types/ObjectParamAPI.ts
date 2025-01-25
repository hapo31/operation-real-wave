import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http.ts';
import { Configuration} from '../configuration.ts'

import { Album } from '../models/Album.ts';
import { AlbumListResponse } from '../models/AlbumListResponse.ts';
import { AlbumSongListResponse } from '../models/AlbumSongListResponse.ts';
import { AlbumSummary } from '../models/AlbumSummary.ts';
import { FetchAlbumResponse } from '../models/FetchAlbumResponse.ts';
import { FetchSongResponse } from '../models/FetchSongResponse.ts';
import { FileStatus } from '../models/FileStatus.ts';
import { Song } from '../models/Song.ts';
import { SongStatusResponse } from '../models/SongStatusResponse.ts';

import { ObservableAlbumApi } from "./ObservableAPI.ts";
import { AlbumApiRequestFactory, AlbumApiResponseProcessor} from "../apis/AlbumApi.ts";

export interface AlbumApiAlbumCidDeleteRequest {
    /**
     * アルバムの cid
     * Defaults to: undefined
     * @type string
     * @memberof AlbumApialbumCidDelete
     */
    cid: string
}

export interface AlbumApiAlbumCidGetRequest {
    /**
     * アルバムの cid
     * Defaults to: undefined
     * @type string
     * @memberof AlbumApialbumCidGet
     */
    cid: string
}

export interface AlbumApiAlbumCidPostRequest {
    /**
     * アルバムの cid
     * Defaults to: undefined
     * @type string
     * @memberof AlbumApialbumCidPost
     */
    cid: string
}

export interface AlbumApiAlbumsGetRequest {
}

export class ObjectAlbumApi {
    private api: ObservableAlbumApi

    public constructor(configuration: Configuration, requestFactory?: AlbumApiRequestFactory, responseProcessor?: AlbumApiResponseProcessor) {
        this.api = new ObservableAlbumApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * 指定したアルバムをファイルシステム上から削除する
     * @param param the request object
     */
    public albumCidDeleteWithHttpInfo(param: AlbumApiAlbumCidDeleteRequest, options?: Configuration): Promise<HttpInfo<AlbumSongListResponse>> {
        return this.api.albumCidDeleteWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定したアルバムをファイルシステム上から削除する
     * @param param the request object
     */
    public albumCidDelete(param: AlbumApiAlbumCidDeleteRequest, options?: Configuration): Promise<AlbumSongListResponse> {
        return this.api.albumCidDelete(param.cid,  options).toPromise();
    }

    /**
     * 指定したアルバムの楽曲一覧を取得
     * @param param the request object
     */
    public albumCidGetWithHttpInfo(param: AlbumApiAlbumCidGetRequest, options?: Configuration): Promise<HttpInfo<AlbumSongListResponse>> {
        return this.api.albumCidGetWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定したアルバムの楽曲一覧を取得
     * @param param the request object
     */
    public albumCidGet(param: AlbumApiAlbumCidGetRequest, options?: Configuration): Promise<AlbumSongListResponse> {
        return this.api.albumCidGet(param.cid,  options).toPromise();
    }

    /**
     * 指定したアルバムの楽曲すべてのダウンロードを開始する
     * @param param the request object
     */
    public albumCidPostWithHttpInfo(param: AlbumApiAlbumCidPostRequest, options?: Configuration): Promise<HttpInfo<FetchAlbumResponse>> {
        return this.api.albumCidPostWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定したアルバムの楽曲すべてのダウンロードを開始する
     * @param param the request object
     */
    public albumCidPost(param: AlbumApiAlbumCidPostRequest, options?: Configuration): Promise<FetchAlbumResponse> {
        return this.api.albumCidPost(param.cid,  options).toPromise();
    }

    /**
     * アルバムの一覧を取得
     * @param param the request object
     */
    public albumsGetWithHttpInfo(param: AlbumApiAlbumsGetRequest = {}, options?: Configuration): Promise<HttpInfo<AlbumListResponse>> {
        return this.api.albumsGetWithHttpInfo( options).toPromise();
    }

    /**
     * アルバムの一覧を取得
     * @param param the request object
     */
    public albumsGet(param: AlbumApiAlbumsGetRequest = {}, options?: Configuration): Promise<AlbumListResponse> {
        return this.api.albumsGet( options).toPromise();
    }

}

import { ObservableSongsApi } from "./ObservableAPI.ts";
import { SongsApiRequestFactory, SongsApiResponseProcessor} from "../apis/SongsApi.ts";

export interface SongsApiSongCidDeleteRequest {
    /**
     * 楽曲の cid
     * Defaults to: undefined
     * @type string
     * @memberof SongsApisongCidDelete
     */
    cid: string
}

export interface SongsApiSongCidGetRequest {
    /**
     * 楽曲の cid
     * Defaults to: undefined
     * @type string
     * @memberof SongsApisongCidGet
     */
    cid: string
}

export interface SongsApiSongCidPostRequest {
    /**
     * 楽曲の cid
     * Defaults to: undefined
     * @type string
     * @memberof SongsApisongCidPost
     */
    cid: string
}

export class ObjectSongsApi {
    private api: ObservableSongsApi

    public constructor(configuration: Configuration, requestFactory?: SongsApiRequestFactory, responseProcessor?: SongsApiResponseProcessor) {
        this.api = new ObservableSongsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * 指定した楽曲をファイルシステム上から削除する
     * @param param the request object
     */
    public songCidDeleteWithHttpInfo(param: SongsApiSongCidDeleteRequest, options?: Configuration): Promise<HttpInfo<SongStatusResponse>> {
        return this.api.songCidDeleteWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定した楽曲をファイルシステム上から削除する
     * @param param the request object
     */
    public songCidDelete(param: SongsApiSongCidDeleteRequest, options?: Configuration): Promise<SongStatusResponse> {
        return this.api.songCidDelete(param.cid,  options).toPromise();
    }

    /**
     * 指定した楽曲の状態を取得
     * @param param the request object
     */
    public songCidGetWithHttpInfo(param: SongsApiSongCidGetRequest, options?: Configuration): Promise<HttpInfo<SongStatusResponse>> {
        return this.api.songCidGetWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定した楽曲の状態を取得
     * @param param the request object
     */
    public songCidGet(param: SongsApiSongCidGetRequest, options?: Configuration): Promise<SongStatusResponse> {
        return this.api.songCidGet(param.cid,  options).toPromise();
    }

    /**
     * 指定した楽曲のダウンロードを開始する
     * @param param the request object
     */
    public songCidPostWithHttpInfo(param: SongsApiSongCidPostRequest, options?: Configuration): Promise<HttpInfo<FetchSongResponse>> {
        return this.api.songCidPostWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定した楽曲のダウンロードを開始する
     * @param param the request object
     */
    public songCidPost(param: SongsApiSongCidPostRequest, options?: Configuration): Promise<FetchSongResponse> {
        return this.api.songCidPost(param.cid,  options).toPromise();
    }

}
