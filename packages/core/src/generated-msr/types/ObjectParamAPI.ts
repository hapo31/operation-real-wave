import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http.ts';
import { Configuration} from '../configuration.ts'

import { AlbumCidDetailGet200Response } from '../models/AlbumCidDetailGet200Response.ts';
import { AlbumCidDetailGet200ResponseData } from '../models/AlbumCidDetailGet200ResponseData.ts';
import { AlbumCidDetailGet200ResponseDataSongsInner } from '../models/AlbumCidDetailGet200ResponseDataSongsInner.ts';
import { AlbumsGet200Response } from '../models/AlbumsGet200Response.ts';
import { AlbumsGet200ResponseDataInner } from '../models/AlbumsGet200ResponseDataInner.ts';
import { SongCidGet200Response } from '../models/SongCidGet200Response.ts';
import { SongCidGet200ResponseData } from '../models/SongCidGet200ResponseData.ts';

import { ObservableAlbumApi } from "./ObservableAPI.ts";
import { AlbumApiRequestFactory, AlbumApiResponseProcessor} from "../apis/AlbumApi.ts";

export interface AlbumApiAlbumCidDetailGetRequest {
    /**
     * アルバムの cid
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
     * 指定したアルバムの収録楽曲一覧を取得
     * @param param the request object
     */
    public albumCidDetailGetWithHttpInfo(param: AlbumApiAlbumCidDetailGetRequest, options?: Configuration): Promise<HttpInfo<AlbumCidDetailGet200Response>> {
        return this.api.albumCidDetailGetWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定したアルバムの収録楽曲一覧を取得
     * @param param the request object
     */
    public albumCidDetailGet(param: AlbumApiAlbumCidDetailGetRequest, options?: Configuration): Promise<AlbumCidDetailGet200Response> {
        return this.api.albumCidDetailGet(param.cid,  options).toPromise();
    }

    /**
     * リリース済みアルバムの一覧を取得
     * @param param the request object
     */
    public albumsGetWithHttpInfo(param: AlbumApiAlbumsGetRequest = {}, options?: Configuration): Promise<HttpInfo<AlbumsGet200Response>> {
        return this.api.albumsGetWithHttpInfo( options).toPromise();
    }

    /**
     * リリース済みアルバムの一覧を取得
     * @param param the request object
     */
    public albumsGet(param: AlbumApiAlbumsGetRequest = {}, options?: Configuration): Promise<AlbumsGet200Response> {
        return this.api.albumsGet( options).toPromise();
    }

}

import { ObservableSongsApi } from "./ObservableAPI.ts";
import { SongsApiRequestFactory, SongsApiResponseProcessor} from "../apis/SongsApi.ts";

export interface SongsApiSongCidGetRequest {
    /**
     * 楽曲の cid
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
    public songCidGetWithHttpInfo(param: SongsApiSongCidGetRequest, options?: Configuration): Promise<HttpInfo<SongCidGet200Response>> {
        return this.api.songCidGetWithHttpInfo(param.cid,  options).toPromise();
    }

    /**
     * 指定した楽曲の詳細を取得
     * @param param the request object
     */
    public songCidGet(param: SongsApiSongCidGetRequest, options?: Configuration): Promise<SongCidGet200Response> {
        return this.api.songCidGet(param.cid,  options).toPromise();
    }

}
