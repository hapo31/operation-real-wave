# .SongsApi

All URIs are relative to *http://localhost:8000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deleteSong**](SongsApi.md#deleteSong) | **DELETE** /song/{cid} | 指定した楽曲をファイルシステム上から削除する
[**fetchSong**](SongsApi.md#fetchSong) | **POST** /song/{cid} | 指定した楽曲のダウンロードを開始する
[**getSongStatus**](SongsApi.md#getSongStatus) | **GET** /song/{cid} | 指定した楽曲の状態を取得


# **deleteSong**
> SongStatusResponse deleteSong()


### Example


```typescript
import { createConfiguration, SongsApi } from '';
import type { SongsApiDeleteSongRequest } from '';

const configuration = createConfiguration();
const apiInstance = new SongsApi(configuration);

const request: SongsApiDeleteSongRequest = {
    // 楽曲の cid
  cid: "cid_example",
};

const data = await apiInstance.deleteSong(request);
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

# **fetchSong**
> FetchSongResponse fetchSong()


### Example


```typescript
import { createConfiguration, SongsApi } from '';
import type { SongsApiFetchSongRequest } from '';

const configuration = createConfiguration();
const apiInstance = new SongsApi(configuration);

const request: SongsApiFetchSongRequest = {
    // 楽曲の cid
  cid: "cid_example",
};

const data = await apiInstance.fetchSong(request);
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

# **getSongStatus**
> SongStatusResponse getSongStatus()


### Example


```typescript
import { createConfiguration, SongsApi } from '';
import type { SongsApiGetSongStatusRequest } from '';

const configuration = createConfiguration();
const apiInstance = new SongsApi(configuration);

const request: SongsApiGetSongStatusRequest = {
    // 楽曲の cid
  cid: "cid_example",
};

const data = await apiInstance.getSongStatus(request);
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


