# .SongsApi

All URIs are relative to *http://localhost:3000/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**songCidDelete**](SongsApi.md#songCidDelete) | **DELETE** /song/{cid} | 指定した楽曲をファイルシステム上から削除する
[**songCidGet**](SongsApi.md#songCidGet) | **GET** /song/{cid} | 指定した楽曲の状態を取得
[**songCidPost**](SongsApi.md#songCidPost) | **POST** /song/{cid} | 指定した楽曲のダウンロードを開始する


# **songCidDelete**
> SongStatusResponse songCidDelete()


### Example


```typescript
import { createConfiguration, SongsApi } from '';
import type { SongsApiSongCidDeleteRequest } from '';

const configuration = createConfiguration();
const apiInstance = new SongsApi(configuration);

const request: SongsApiSongCidDeleteRequest = {
    // 楽曲の cid
  cid: "cid_example",
};

const data = await apiInstance.songCidDelete(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cid** | [**string**] | 楽曲の cid | defaults to undefined


### Return type

**SongStatusResponse**

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

# **songCidGet**
> SongStatusResponse songCidGet()


### Example


```typescript
import { createConfiguration, SongsApi } from '';
import type { SongsApiSongCidGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new SongsApi(configuration);

const request: SongsApiSongCidGetRequest = {
    // 楽曲の cid
  cid: "cid_example",
};

const data = await apiInstance.songCidGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cid** | [**string**] | 楽曲の cid | defaults to undefined


### Return type

**SongStatusResponse**

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

# **songCidPost**
> FetchSongResponse songCidPost()


### Example


```typescript
import { createConfiguration, SongsApi } from '';
import type { SongsApiSongCidPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new SongsApi(configuration);

const request: SongsApiSongCidPostRequest = {
    // 楽曲の cid
  cid: "cid_example",
};

const data = await apiInstance.songCidPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cid** | [**string**] | 楽曲の cid | defaults to undefined


### Return type

**FetchSongResponse**

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


