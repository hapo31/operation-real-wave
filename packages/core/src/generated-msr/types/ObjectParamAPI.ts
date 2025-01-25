import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http.ts';
import { Configuration} from '../configuration.ts'

import { AlbumData } from '../models/AlbumData.ts';
import { AlbumDataResponse } from '../models/AlbumDataResponse.ts';
import { AlbumDetailResponse } from '../models/AlbumDetailResponse.ts';
import { AlbumDetails } from '../models/AlbumDetails.ts';
import { AlbumSummary } from '../models/AlbumSummary.ts';
import { AlbumsResponse } from '../models/AlbumsResponse.ts';
import { Song } from '../models/Song.ts';
import { SongDetailsResponse } from '../models/SongDetailsResponse.ts';
import { SongSummary } from '../models/SongSummary.ts';

import { ObservableAlbumApi } from "./ObservableAPI.ts";
import { AlbumApiRequestFactory, AlbumApiResponseProcessor} from "../apis/AlbumApi.ts";

export interface AlbumApiAlbumCidDataGetRequest {
    /**
     * アルバムの cid
     * Defaults to: undefined
     * @type string
     * @memberof AlbumApialbumCidDataGet
     */
    cid: string
}

export interface AlbumApiAlbumCidDetailGetRequest {
    /**
     * アルバムの cid
     * Defaults to: undefined
     * @type string
     * @memberof AlbumApialbumCidDetailGet
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
     * 指定したアルバムの楽曲を除いた詳細データを取得
     * @param param the request object
     */
    public albumCidDataGetWithHttpInfo(param: AlbumApiAlbumCidDataGetRequest, options?: Configuration): Promise<HttpInfo<AlbumDetailResponse>> {
        return this.api.albumCidDataGetWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定したアルバムの楽曲を除いた詳細データを取得
     * @param param the request object
     */
    public albumCidDataGet(param: AlbumApiAlbumCidDataGetRequest, options?: Configuration): Promise<AlbumDetailResponse> {
        return this.api.albumCidDataGet(param.cid,  options).toPromise();
    }

    /**
     * 指定したアルバムの収録楽曲一覧を取得
     * @param param the request object
     */
    public albumCidDetailGetWithHttpInfo(param: AlbumApiAlbumCidDetailGetRequest, options?: Configuration): Promise<HttpInfo<AlbumDetailResponse>> {
        return this.api.albumCidDetailGetWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定したアルバムの収録楽曲一覧を取得
     * @param param the request object
     */
    public albumCidDetailGet(param: AlbumApiAlbumCidDetailGetRequest, options?: Configuration): Promise<AlbumDetailResponse> {
        return this.api.albumCidDetailGet(param.cid,  options).toPromise();
    }

    /**
     * リリース済みアルバムの一覧を取得
     * @param param the request object
     */
    public albumsGetWithHttpInfo(param: AlbumApiAlbumsGetRequest = {}, options?: Configuration): Promise<HttpInfo<AlbumsResponse>> {
        return this.api.albumsGetWithHttpInfo( options).toPromise();
    }

    /**
     * リリース済みアルバムの一覧を取得
     * @param param the request object
     */
    public albumsGet(param: AlbumApiAlbumsGetRequest = {}, options?: Configuration): Promise<AlbumsResponse> {
        return this.api.albumsGet( options).toPromise();
    }

}

import { ObservableSongsApi } from "./ObservableAPI.ts";
import { SongsApiRequestFactory, SongsApiResponseProcessor} from "../apis/SongsApi.ts";

export interface SongsApiSongCidGetRequest {
    /**
     * 楽曲の cid
     * Defaults to: undefined
     * @type string
     * @memberof SongsApisongCidGet
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
    public songCidGetWithHttpInfo(param: SongsApiSongCidGetRequest, options?: Configuration): Promise<HttpInfo<SongDetailsResponse>> {
        return this.api.songCidGetWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定した楽曲の詳細を取得
     * @param param the request object
     */
    public songCidGet(param: SongsApiSongCidGetRequest, options?: Configuration): Promise<SongDetailsResponse> {
        return this.api.songCidGet(param.cid,  options).toPromise();
    }

}
