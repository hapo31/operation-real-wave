import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http.ts';
import { Configuration} from '../configuration.ts'

import { MsrAlbumData } from '../models/MsrAlbumData.ts';
import { MsrAlbumDataResponse } from '../models/MsrAlbumDataResponse.ts';
import { MsrAlbumDetailResponse } from '../models/MsrAlbumDetailResponse.ts';
import { MsrAlbumDetails } from '../models/MsrAlbumDetails.ts';
import { MsrAlbumSummary } from '../models/MsrAlbumSummary.ts';
import { MsrAlbumsResponse } from '../models/MsrAlbumsResponse.ts';
import { MsrSong } from '../models/MsrSong.ts';
import { MsrSongDetailsResponse } from '../models/MsrSongDetailsResponse.ts';
import { MsrSongSummary } from '../models/MsrSongSummary.ts';

import { ObservableAlbumApi } from "./ObservableAPI.ts";
import { AlbumApiRequestFactory, AlbumApiResponseProcessor} from "../apis/AlbumApi.ts";

export interface AlbumApiGetAlbumDetailsRequest {
    /**
     * アルバムの cid
     * Defaults to: undefined
     * @type string
     * @memberof AlbumApigetAlbumDetails
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
     * 指定したアルバムの楽曲を除いた詳細データを取得
     * @param param the request object
     */
    public getAlbumDetailsWithHttpInfo(param: AlbumApiGetAlbumDetailsRequest, options?: Configuration): Promise<HttpInfo<MsrAlbumDetailResponse>> {
        return this.api.getAlbumDetailsWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定したアルバムの楽曲を除いた詳細データを取得
     * @param param the request object
     */
    public getAlbumDetails(param: AlbumApiGetAlbumDetailsRequest, options?: Configuration): Promise<MsrAlbumDetailResponse> {
        return this.api.getAlbumDetails(param.cid,  options).toPromise();
    }

    /**
     * 指定したアルバムの収録楽曲一覧を取得
     * @param param the request object
     */
    public getAlbumSongsWithHttpInfo(param: AlbumApiGetAlbumSongsRequest, options?: Configuration): Promise<HttpInfo<MsrAlbumDetailResponse>> {
        return this.api.getAlbumSongsWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定したアルバムの収録楽曲一覧を取得
     * @param param the request object
     */
    public getAlbumSongs(param: AlbumApiGetAlbumSongsRequest, options?: Configuration): Promise<MsrAlbumDetailResponse> {
        return this.api.getAlbumSongs(param.cid,  options).toPromise();
    }

    /**
     * リリース済みアルバムの一覧を取得
     * @param param the request object
     */
    public getAlbumsWithHttpInfo(param: AlbumApiGetAlbumsRequest = {}, options?: Configuration): Promise<HttpInfo<MsrAlbumsResponse>> {
        return this.api.getAlbumsWithHttpInfo( options).toPromise();
    }

    /**
     * リリース済みアルバムの一覧を取得
     * @param param the request object
     */
    public getAlbums(param: AlbumApiGetAlbumsRequest = {}, options?: Configuration): Promise<MsrAlbumsResponse> {
        return this.api.getAlbums( options).toPromise();
    }

}

import { ObservableSongsApi } from "./ObservableAPI.ts";
import { SongsApiRequestFactory, SongsApiResponseProcessor} from "../apis/SongsApi.ts";

export interface SongsApiGetSongDetailsRequest {
    /**
     * 楽曲の cid
     * Defaults to: undefined
     * @type string
     * @memberof SongsApigetSongDetails
     */
    cid: string
}

export class ObjectSongsApi {
    private api: ObservableSongsApi

    public constructor(configuration: Configuration, requestFactory?: SongsApiRequestFactory, responseProcessor?: SongsApiResponseProcessor) {
        this.api = new ObservableSongsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * 指定した楽曲の詳細を取得
     * @param param the request object
     */
    public getSongDetailsWithHttpInfo(param: SongsApiGetSongDetailsRequest, options?: Configuration): Promise<HttpInfo<MsrSongDetailsResponse>> {
        return this.api.getSongDetailsWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定した楽曲の詳細を取得
     * @param param the request object
     */
    public getSongDetails(param: SongsApiGetSongDetailsRequest, options?: Configuration): Promise<MsrSongDetailsResponse> {
        return this.api.getSongDetails(param.cid,  options).toPromise();
    }

}
