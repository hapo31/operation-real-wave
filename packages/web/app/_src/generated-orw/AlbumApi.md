# .AlbumApi

All URIs are relative to *http://localhost:8000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deleteAlbum**](AlbumApi.md#deleteAlbum) | **DELETE** /album/{cid} | 指定したアルバムをファイルシステム上から削除する
[**fetchAlbumSongs**](AlbumApi.md#fetchAlbumSongs) | **POST** /album/{cid} | 指定したアルバムの楽曲すべてのダウンロードを開始する
[**getAlbumSongs**](AlbumApi.md#getAlbumSongs) | **GET** /album/{cid} | 指定したアルバムの楽曲一覧を取得
[**getAlbums**](AlbumApi.md#getAlbums) | **GET** /albums | アルバムの一覧を取得


# **deleteAlbum**
> AlbumSongListResponse deleteAlbum()


### Example


```typescript
import { createConfiguration, AlbumApi } from '';
import type { AlbumApiDeleteAlbumRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AlbumApi(configuration);

const request: AlbumApiDeleteAlbumRequest = {
    // アルバムの cid
  cid: "cid_example",
};

const data = await apiInstance.deleteAlbum(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cid** | [**string**] | アルバムの cid | defaults to undefined


### Return type

**AlbumSongListResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **fetchAlbumSongs**
> FetchAlbumResponse fetchAlbumSongs()


### Example


```typescript
import { createConfiguration, AlbumApi } from '';
import type { AlbumApiFetchAlbumSongsRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AlbumApi(configuration);

const request: AlbumApiFetchAlbumSongsRequest = {
    // アルバムの cid
  cid: "cid_example",
};

const data = await apiInstance.fetchAlbumSongs(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cid** | [**string**] | アルバムの cid | defaults to undefined


### Return type

**FetchAlbumResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAlbumSongs**
> AlbumSongListResponse getAlbumSongs()


### Example


```typescript
import { createConfiguration, AlbumApi } from '';
import type { AlbumApiGetAlbumSongsRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AlbumApi(configuration);

const request: AlbumApiGetAlbumSongsRequest = {
    // アルバムの cid
  cid: "cid_example",
};

const data = await apiInstance.getAlbumSongs(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cid** | [**string**] | アルバムの cid | defaults to undefined


### Return type

**AlbumSongListResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAlbums**
> AlbumListResponse getAlbums()


### Example


```typescript
import { createConfiguration, AlbumApi } from '';

const configuration = createConfiguration();
const apiInstance = new AlbumApi(configuration);

const request = {};

const data = await apiInstance.getAlbums(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**AlbumListResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


