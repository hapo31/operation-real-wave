# .AlbumApi

All URIs are relative to *http://localhost:3000/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**albumCidDelete**](AlbumApi.md#albumCidDelete) | **DELETE** /album/{cid} | 指定したアルバムをファイルシステム上から削除する
[**albumCidGet**](AlbumApi.md#albumCidGet) | **GET** /album/{cid} | 指定したアルバムの楽曲一覧を取得
[**albumCidPost**](AlbumApi.md#albumCidPost) | **POST** /album/{cid} | 指定したアルバムの楽曲すべてのダウンロードを開始する
[**albumsGet**](AlbumApi.md#albumsGet) | **GET** /albums | アルバムの一覧を取得


# **albumCidDelete**
> AlbumSongListResponse albumCidDelete()


### Example


```typescript
import { createConfiguration, AlbumApi } from '';
import type { AlbumApiAlbumCidDeleteRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AlbumApi(configuration);

const request: AlbumApiAlbumCidDeleteRequest = {
    // アルバムの cid
  cid: "cid_example",
};

const data = await apiInstance.albumCidDelete(request);
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

# **albumCidGet**
> AlbumSongListResponse albumCidGet()


### Example


```typescript
import { createConfiguration, AlbumApi } from '';
import type { AlbumApiAlbumCidGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AlbumApi(configuration);

const request: AlbumApiAlbumCidGetRequest = {
    // アルバムの cid
  cid: "cid_example",
};

const data = await apiInstance.albumCidGet(request);
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

# **albumCidPost**
> FetchAlbumResponse albumCidPost()


### Example


```typescript
import { createConfiguration, AlbumApi } from '';
import type { AlbumApiAlbumCidPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AlbumApi(configuration);

const request: AlbumApiAlbumCidPostRequest = {
    // アルバムの cid
  cid: "cid_example",
};

const data = await apiInstance.albumCidPost(request);
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

# **albumsGet**
> AlbumListResponse albumsGet()


### Example


```typescript
import { createConfiguration, AlbumApi } from '';

const configuration = createConfiguration();
const apiInstance = new AlbumApi(configuration);

const request = {};

const data = await apiInstance.albumsGet(request);
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


