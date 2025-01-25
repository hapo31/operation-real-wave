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
import { ObservableAlbumApi } from './ObservableAPI';

import { AlbumApiRequestFactory, AlbumApiResponseProcessor} from "../apis/AlbumApi";
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
    public albumCidDeleteWithHttpInfo(cid: string, _options?: Configuration): Promise<HttpInfo<AlbumSongListResponse>> {
        const result = this.api.albumCidDeleteWithHttpInfo(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定したアルバムをファイルシステム上から削除する
     * @param cid アルバムの cid
     */
    public albumCidDelete(cid: string, _options?: Configuration): Promise<AlbumSongListResponse> {
        const result = this.api.albumCidDelete(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定したアルバムの楽曲一覧を取得
     * @param cid アルバムの cid
     */
    public albumCidGetWithHttpInfo(cid: string, _options?: Configuration): Promise<HttpInfo<AlbumSongListResponse>> {
        const result = this.api.albumCidGetWithHttpInfo(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定したアルバムの楽曲一覧を取得
     * @param cid アルバムの cid
     */
    public albumCidGet(cid: string, _options?: Configuration): Promise<AlbumSongListResponse> {
        const result = this.api.albumCidGet(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定したアルバムの楽曲すべてのダウンロードを開始する
     * @param cid アルバムの cid
     */
    public albumCidPostWithHttpInfo(cid: string, _options?: Configuration): Promise<HttpInfo<FetchAlbumResponse>> {
        const result = this.api.albumCidPostWithHttpInfo(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定したアルバムの楽曲すべてのダウンロードを開始する
     * @param cid アルバムの cid
     */
    public albumCidPost(cid: string, _options?: Configuration): Promise<FetchAlbumResponse> {
        const result = this.api.albumCidPost(cid, _options);
        return result.toPromise();
    }

    /**
     * アルバムの一覧を取得
     */
    public albumsGetWithHttpInfo(_options?: Configuration): Promise<HttpInfo<AlbumListResponse>> {
        const result = this.api.albumsGetWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * アルバムの一覧を取得
     */
    public albumsGet(_options?: Configuration): Promise<AlbumListResponse> {
        const result = this.api.albumsGet(_options);
        return result.toPromise();
    }


}



import { ObservableSongsApi } from './ObservableAPI';

import { SongsApiRequestFactory, SongsApiResponseProcessor} from "../apis/SongsApi";
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
    public songCidDeleteWithHttpInfo(cid: string, _options?: Configuration): Promise<HttpInfo<SongStatusResponse>> {
        const result = this.api.songCidDeleteWithHttpInfo(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定した楽曲をファイルシステム上から削除する
     * @param cid 楽曲の cid
     */
    public songCidDelete(cid: string, _options?: Configuration): Promise<SongStatusResponse> {
        const result = this.api.songCidDelete(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定した楽曲の状態を取得
     * @param cid 楽曲の cid
     */
    public songCidGetWithHttpInfo(cid: string, _options?: Configuration): Promise<HttpInfo<SongStatusResponse>> {
        const result = this.api.songCidGetWithHttpInfo(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定した楽曲の状態を取得
     * @param cid 楽曲の cid
     */
    public songCidGet(cid: string, _options?: Configuration): Promise<SongStatusResponse> {
        const result = this.api.songCidGet(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定した楽曲のダウンロードを開始する
     * @param cid 楽曲の cid
     */
    public songCidPostWithHttpInfo(cid: string, _options?: Configuration): Promise<HttpInfo<FetchSongResponse>> {
        const result = this.api.songCidPostWithHttpInfo(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定した楽曲のダウンロードを開始する
     * @param cid 楽曲の cid
     */
    public songCidPost(cid: string, _options?: Configuration): Promise<FetchSongResponse> {
        const result = this.api.songCidPost(cid, _options);
        return result.toPromise();
    }


}



