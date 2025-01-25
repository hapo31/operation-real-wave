# .AlbumApi

All URIs are relative to *http://localhost:3000/msr/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**albumCidDataGet**](AlbumApi.md#albumCidDataGet) | **GET** /album/{cid}/data | 指定したアルバムの楽曲を除いた詳細データを取得
[**albumCidDetailGet**](AlbumApi.md#albumCidDetailGet) | **GET** /album/{cid}/detail | 指定したアルバムの収録楽曲一覧を取得
[**albumsGet**](AlbumApi.md#albumsGet) | **GET** /albums | リリース済みアルバムの一覧を取得


# **albumCidDataGet**
> AlbumDetailResponse albumCidDataGet()


### Example


```typescript
import { createConfiguration, AlbumApi } from '';
import type { AlbumApiAlbumCidDataGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AlbumApi(configuration);

const request: AlbumApiAlbumCidDataGetRequest = {
    // アルバムの cid
  cid: "cid_example",
};

const data = await apiInstance.albumCidDataGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cid** | [**string**] | アルバムの cid | defaults to undefined


### Return type

**AlbumDetailResponse**

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

# **albumCidDetailGet**
> AlbumDetailResponse albumCidDetailGet()


### Example


```typescript
import { createConfiguration, AlbumApi } from '';
import type { AlbumApiAlbumCidDetailGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AlbumApi(configuration);

const request: AlbumApiAlbumCidDetailGetRequest = {
    // アルバムの cid
  cid: "cid_example",
};

const data = await apiInstance.albumCidDetailGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cid** | [**string**] | アルバムの cid | defaults to undefined


### Return type

**AlbumDetailResponse**

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
> AlbumsResponse albumsGet()


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

**AlbumsResponse**

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


