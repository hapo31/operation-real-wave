import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http.ts';
import { Configuration} from '../configuration.ts'

import { AlbumDetailResponse } from '../models/AlbumDetailResponse.ts';
import { AlbumDetails } from '../models/AlbumDetails.ts';
import { AlbumSummary } from '../models/AlbumSummary.ts';
import { AlbumsResponse } from '../models/AlbumsResponse.ts';
import { Song } from '../models/Song.ts';
import { SongDetailsResponse } from '../models/SongDetailsResponse.ts';
import { SongSummary } from '../models/SongSummary.ts';
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
     * 指定したアルバムの収録楽曲一覧を取得
     * @param cid アルバムの cid
     */
    public albumCidDetailGetWithHttpInfo(cid: string, _options?: Configuration): Promise<HttpInfo<AlbumDetailResponse>> {
        const result = this.api.albumCidDetailGetWithHttpInfo(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定したアルバムの収録楽曲一覧を取得
     * @param cid アルバムの cid
     */
    public albumCidDetailGet(cid: string, _options?: Configuration): Promise<AlbumDetailResponse> {
        const result = this.api.albumCidDetailGet(cid, _options);
        return result.toPromise();
    }

    /**
     * リリース済みアルバムの一覧を取得
     */
    public albumsGetWithHttpInfo(_options?: Configuration): Promise<HttpInfo<AlbumsResponse>> {
        const result = this.api.albumsGetWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * リリース済みアルバムの一覧を取得
     */
    public albumsGet(_options?: Configuration): Promise<AlbumsResponse> {
        const result = this.api.albumsGet(_options);
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
     * 指定した楽曲の詳細を取得
     * @param cid 楽曲の cid
     */
    public songCidGetWithHttpInfo(cid: string, _options?: Configuration): Promise<HttpInfo<SongDetailsResponse>> {
        const result = this.api.songCidGetWithHttpInfo(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定した楽曲の詳細を取得
     * @param cid 楽曲の cid
     */
    public songCidGet(cid: string, _options?: Configuration): Promise<SongDetailsResponse> {
        const result = this.api.songCidGet(cid, _options);
        return result.toPromise();
    }


}



