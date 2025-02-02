# .AlbumApi

All URIs are relative to *https://monster-siren.hypergryph.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAlbumDetails**](AlbumApi.md#getAlbumDetails) | **GET** /album/{cid}/data | 指定したアルバムの楽曲を除いた詳細データを取得
[**getAlbumSongs**](AlbumApi.md#getAlbumSongs) | **GET** /album/{cid}/detail | 指定したアルバムの収録楽曲一覧を取得
[**getAlbums**](AlbumApi.md#getAlbums) | **GET** /albums | リリース済みアルバムの一覧を取得


# **getAlbumDetails**
> MsrAlbumDetailResponse getAlbumDetails()


### Example


```typescript
import { createConfiguration, AlbumApi } from '';
import type { AlbumApiGetAlbumDetailsRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AlbumApi(configuration);

const request: AlbumApiGetAlbumDetailsRequest = {
    // アルバムの cid
  cid: "cid_example",
};

const data = await apiInstance.getAlbumDetails(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cid** | [**string**] | アルバムの cid | defaults to undefined


### Return type

**MsrAlbumDetailResponse**

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
> MsrAlbumDetailResponse getAlbumSongs()


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

**MsrAlbumDetailResponse**

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
> MsrAlbumsResponse getAlbums()


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

**MsrAlbumsResponse**

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


