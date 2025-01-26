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
import { ObservableAlbumApi } from './ObservableAPI.ts';

import { AlbumApiRequestFactory, AlbumApiResponseProcessor} from "../apis/AlbumApi.ts";
export class PromiseAlbumApi {
    private api: ObservableAlbumApi

    public constructor(
        configuration: Configuration,
        requestFactory?: AlbumApiRequestFactory,
        responseProcessor?: AlbumApiResponseProcessor
    ) {
        this.api = new ObservableAlbumApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * 指定したアルバムをファイルシステム上から削除する
     * @param cid アルバムの cid
     */
    public deleteAlbumWithHttpInfo(cid: string, _options?: Configuration): Promise<HttpInfo<AlbumSongListResponse>> {
        const result = this.api.deleteAlbumWithHttpInfo(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定したアルバムをファイルシステム上から削除する
     * @param cid アルバムの cid
     */
    public deleteAlbum(cid: string, _options?: Configuration): Promise<AlbumSongListResponse> {
        const result = this.api.deleteAlbum(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定したアルバムの楽曲すべてのダウンロードを開始する
     * @param cid アルバムの cid
     */
    public fetchAlbumSongsWithHttpInfo(cid: string, _options?: Configuration): Promise<HttpInfo<FetchAlbumResponse>> {
        const result = this.api.fetchAlbumSongsWithHttpInfo(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定したアルバムの楽曲すべてのダウンロードを開始する
     * @param cid アルバムの cid
     */
    public fetchAlbumSongs(cid: string, _options?: Configuration): Promise<FetchAlbumResponse> {
        const result = this.api.fetchAlbumSongs(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定したアルバムの楽曲一覧を取得
     * @param cid アルバムの cid
     */
    public getAlbumSongsWithHttpInfo(cid: string, _options?: Configuration): Promise<HttpInfo<AlbumSongListResponse>> {
        const result = this.api.getAlbumSongsWithHttpInfo(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定したアルバムの楽曲一覧を取得
     * @param cid アルバムの cid
     */
    public getAlbumSongs(cid: string, _options?: Configuration): Promise<AlbumSongListResponse> {
        const result = this.api.getAlbumSongs(cid, _options);
        return result.toPromise();
    }

    /**
     * アルバムの一覧を取得
     */
    public getAlbumsWithHttpInfo(_options?: Configuration): Promise<HttpInfo<AlbumListResponse>> {
        const result = this.api.getAlbumsWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * アルバムの一覧を取得
     */
    public getAlbums(_options?: Configuration): Promise<AlbumListResponse> {
        const result = this.api.getAlbums(_options);
        return result.toPromise();
    }


}



import { ObservableSongsApi } from './ObservableAPI.ts';

import { SongsApiRequestFactory, SongsApiResponseProcessor} from "../apis/SongsApi.ts";
export class PromiseSongsApi {
    private api: ObservableSongsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: SongsApiRequestFactory,
        responseProcessor?: SongsApiResponseProcessor
    ) {
        this.api = new ObservableSongsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * 指定した楽曲をファイルシステム上から削除する
     * @param cid 楽曲の cid
     */
    public deleteSongWithHttpInfo(cid: string, _options?: Configuration): Promise<HttpInfo<SongStatusResponse>> {
        const result = this.api.deleteSongWithHttpInfo(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定した楽曲をファイルシステム上から削除する
     * @param cid 楽曲の cid
     */
    public deleteSong(cid: string, _options?: Configuration): Promise<SongStatusResponse> {
        const result = this.api.deleteSong(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定した楽曲のダウンロードを開始する
     * @param cid 楽曲の cid
     */
    public fetchSongWithHttpInfo(cid: string, _options?: Configuration): Promise<HttpInfo<FetchSongResponse>> {
        const result = this.api.fetchSongWithHttpInfo(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定した楽曲のダウンロードを開始する
     * @param cid 楽曲の cid
     */
    public fetchSong(cid: string, _options?: Configuration): Promise<FetchSongResponse> {
        const result = this.api.fetchSong(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定した楽曲の状態を取得
     * @param cid 楽曲の cid
     */
    public getSongStatusWithHttpInfo(cid: string, _options?: Configuration): Promise<HttpInfo<SongStatusResponse>> {
        const result = this.api.getSongStatusWithHttpInfo(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定した楽曲の状態を取得
     * @param cid 楽曲の cid
     */
    public getSongStatus(cid: string, _options?: Configuration): Promise<SongStatusResponse> {
        const result = this.api.getSongStatus(cid, _options);
        return result.toPromise();
    }


}



