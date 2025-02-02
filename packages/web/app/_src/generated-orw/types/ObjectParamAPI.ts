import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'

import { Album } from '../models/Album';
import { AlbumListResponse } from '../models/AlbumListResponse';
import { AlbumSongListResponse } from '../models/AlbumSongListResponse';
import { AlbumSummary } from '../models/AlbumSummary';
import { FetchAlbumResponse } from '../models/FetchAlbumResponse';
import { FetchSongResponse } from '../models/FetchSongResponse';
import { FileStatus } from '../models/FileStatus';
import { Song } from '../models/Song';
import { SongStatusResponse } from '../models/SongStatusResponse';

import { ObservableAlbumApi } from "./ObservableAPI";
import { AlbumApiRequestFactory, AlbumApiResponseProcessor} from "../apis/AlbumApi";

export interface AlbumApiDeleteAlbumRequest {
    /**
     * アルバムの cid
     * Defaults to: undefined
     * @type string
     * @memberof AlbumApideleteAlbum
     */
    cid: string
}

export interface AlbumApiFetchAlbumSongsRequest {
    /**
     * アルバムの cid
     * Defaults to: undefined
     * @type string
     * @memberof AlbumApifetchAlbumSongs
     */
    cid: string
}

export interface AlbumApiGetAlbumSongsRequest {
    /**
     * アルバムの cid
     * Defaults to: undefined
     * @type string
     * @memberof AlbumApigetAlbumSongs
     */
    cid: string
}

export interface AlbumApiGetAlbumsRequest {
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
    public deleteAlbumWithHttpInfo(param: AlbumApiDeleteAlbumRequest, options?: Configuration): Promise<HttpInfo<AlbumSongListResponse>> {
        return this.api.deleteAlbumWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定したアルバムをファイルシステム上から削除する
     * @param param the request object
     */
    public deleteAlbum(param: AlbumApiDeleteAlbumRequest, options?: Configuration): Promise<AlbumSongListResponse> {
        return this.api.deleteAlbum(param.cid,  options).toPromise();
    }

    /**
     * 指定したアルバムの楽曲すべてのダウンロードを開始する
     * @param param the request object
     */
    public fetchAlbumSongsWithHttpInfo(param: AlbumApiFetchAlbumSongsRequest, options?: Configuration): Promise<HttpInfo<FetchAlbumResponse>> {
        return this.api.fetchAlbumSongsWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定したアルバムの楽曲すべてのダウンロードを開始する
     * @param param the request object
     */
    public fetchAlbumSongs(param: AlbumApiFetchAlbumSongsRequest, options?: Configuration): Promise<FetchAlbumResponse> {
        return this.api.fetchAlbumSongs(param.cid,  options).toPromise();
    }

    /**
     * 指定したアルバムの楽曲一覧を取得
     * @param param the request object
     */
    public getAlbumSongsWithHttpInfo(param: AlbumApiGetAlbumSongsRequest, options?: Configuration): Promise<HttpInfo<AlbumSongListResponse>> {
        return this.api.getAlbumSongsWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定したアルバムの楽曲一覧を取得
     * @param param the request object
     */
    public getAlbumSongs(param: AlbumApiGetAlbumSongsRequest, options?: Configuration): Promise<AlbumSongListResponse> {
        return this.api.getAlbumSongs(param.cid,  options).toPromise();
    }

    /**
     * アルバムの一覧を取得
     * @param param the request object
     */
    public getAlbumsWithHttpInfo(param: AlbumApiGetAlbumsRequest = {}, options?: Configuration): Promise<HttpInfo<AlbumListResponse>> {
        return this.api.getAlbumsWithHttpInfo( options).toPromise();
    }

    /**
     * アルバムの一覧を取得
     * @param param the request object
     */
    public getAlbums(param: AlbumApiGetAlbumsRequest = {}, options?: Configuration): Promise<AlbumListResponse> {
        return this.api.getAlbums( options).toPromise();
    }

}

import { ObservableSongsApi } from "./ObservableAPI";
import { SongsApiRequestFactory, SongsApiResponseProcessor} from "../apis/SongsApi";

export interface SongsApiDeleteSongRequest {
    /**
     * 楽曲の cid
     * Defaults to: undefined
     * @type string
     * @memberof SongsApideleteSong
     */
    cid: string
}

export interface SongsApiFetchSongRequest {
    /**
     * 楽曲の cid
     * Defaults to: undefined
     * @type string
     * @memberof SongsApifetchSong
     */
    cid: string
}

export interface SongsApiGetSongStatusRequest {
    /**
     * 楽曲の cid
     * Defaults to: undefined
     * @type string
     * @memberof SongsApigetSongStatus
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
    public deleteSongWithHttpInfo(param: SongsApiDeleteSongRequest, options?: Configuration): Promise<HttpInfo<SongStatusResponse>> {
        return this.api.deleteSongWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定した楽曲をファイルシステム上から削除する
     * @param param the request object
     */
    public deleteSong(param: SongsApiDeleteSongRequest, options?: Configuration): Promise<SongStatusResponse> {
        return this.api.deleteSong(param.cid,  options).toPromise();
    }

    /**
     * 指定した楽曲のダウンロードを開始する
     * @param param the request object
     */
    public fetchSongWithHttpInfo(param: SongsApiFetchSongRequest, options?: Configuration): Promise<HttpInfo<FetchSongResponse>> {
        return this.api.fetchSongWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定した楽曲のダウンロードを開始する
     * @param param the request object
     */
    public fetchSong(param: SongsApiFetchSongRequest, options?: Configuration): Promise<FetchSongResponse> {
        return this.api.fetchSong(param.cid,  options).toPromise();
    }

    /**
     * 指定した楽曲の状態を取得
     * @param param the request object
     */
    public getSongStatusWithHttpInfo(param: SongsApiGetSongStatusRequest, options?: Configuration): Promise<HttpInfo<SongStatusResponse>> {
        return this.api.getSongStatusWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定した楽曲の状態を取得
     * @param param the request object
     */
    public getSongStatus(param: SongsApiGetSongStatusRequest, options?: Configuration): Promise<SongStatusResponse> {
        return this.api.getSongStatus(param.cid,  options).toPromise();
    }

}
