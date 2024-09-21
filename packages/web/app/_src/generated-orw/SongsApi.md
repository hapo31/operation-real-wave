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
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .SongsApi(configuration);

let body:.SongsApiSongCidDeleteRequest = {
  // string | 楽曲の cid
  cid: "cid_example",
};

apiInstance.songCidDelete(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
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
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .SongsApi(configuration);

let body:.SongsApiSongCidGetRequest = {
  // string | 楽曲の cid
  cid: "cid_example",
};

apiInstance.songCidGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
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
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .SongsApi(configuration);

let body:.SongsApiSongCidPostRequest = {
  // string | 楽曲の cid
  cid: "cid_example",
};

apiInstance.songCidPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
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


