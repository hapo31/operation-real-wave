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
     * 指定したアルバムの楽曲を除いた詳細データを取得
     * @param cid アルバムの cid
     */
    public getAlbumDetailsWithHttpInfo(cid: string, _options?: Configuration): Promise<HttpInfo<MsrAlbumDetailResponse>> {
        const result = this.api.getAlbumDetailsWithHttpInfo(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定したアルバムの楽曲を除いた詳細データを取得
     * @param cid アルバムの cid
     */
    public getAlbumDetails(cid: string, _options?: Configuration): Promise<MsrAlbumDetailResponse> {
        const result = this.api.getAlbumDetails(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定したアルバムの収録楽曲一覧を取得
     * @param cid アルバムの cid
     */
    public getAlbumSongsWithHttpInfo(cid: string, _options?: Configuration): Promise<HttpInfo<MsrAlbumDetailResponse>> {
        const result = this.api.getAlbumSongsWithHttpInfo(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定したアルバムの収録楽曲一覧を取得
     * @param cid アルバムの cid
     */
    public getAlbumSongs(cid: string, _options?: Configuration): Promise<MsrAlbumDetailResponse> {
        const result = this.api.getAlbumSongs(cid, _options);
        return result.toPromise();
    }

    /**
     * リリース済みアルバムの一覧を取得
     */
    public getAlbumsWithHttpInfo(_options?: Configuration): Promise<HttpInfo<MsrAlbumsResponse>> {
        const result = this.api.getAlbumsWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * リリース済みアルバムの一覧を取得
     */
    public getAlbums(_options?: Configuration): Promise<MsrAlbumsResponse> {
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
     * 指定した楽曲の詳細を取得
     * @param cid 楽曲の cid
     */
    public getSongDetailsWithHttpInfo(cid: string, _options?: Configuration): Promise<HttpInfo<MsrSongDetailsResponse>> {
        const result = this.api.getSongDetailsWithHttpInfo(cid, _options);
        return result.toPromise();
    }

    /**
     * 指定した楽曲の詳細を取得
     * @param cid 楽曲の cid
     */
    public getSongDetails(cid: string, _options?: Configuration): Promise<MsrSongDetailsResponse> {
        const result = this.api.getSongDetails(cid, _options);
        return result.toPromise();
    }


}



