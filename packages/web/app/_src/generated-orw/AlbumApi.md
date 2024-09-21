# .AlbumApi

All URIs are relative to *http://localhost:3000/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**albumCidDelete**](AlbumApi.md#albumCidDelete) | **DELETE** /album/{cid} | 指定したアルバムをファイルシステム上から削除する
[**albumCidGet**](AlbumApi.md#albumCidGet) | **GET** /album/{cid} | 指定したアルバムの楽曲一覧を取得
[**albumCidPost**](AlbumApi.md#albumCidPost) | **POST** /album/{cid} | 指定したアルバムの楽曲すべてのダウンロードを開始する
[**albumsGet**](AlbumApi.md#albumsGet) | **GET** /albums | アルバムの一覧を取得


# **albumCidDelete**
> SongListResponse albumCidDelete()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AlbumApi(configuration);

let body:.AlbumApiAlbumCidDeleteRequest = {
  // string | アルバムの cid
  cid: "cid_example",
};

apiInstance.albumCidDelete(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cid** | [**string**] | アルバムの cid | defaults to undefined


### Return type

**SongListResponse**

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
> SongListResponse albumCidGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AlbumApi(configuration);

let body:.AlbumApiAlbumCidGetRequest = {
  // string | アルバムの cid
  cid: "cid_example",
};

apiInstance.albumCidGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cid** | [**string**] | アルバムの cid | defaults to undefined


### Return type

**SongListResponse**

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
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AlbumApi(configuration);

let body:.AlbumApiAlbumCidPostRequest = {
  // string | アルバムの cid
  cid: "cid_example",
};

apiInstance.albumCidPost(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
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
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .AlbumApi(configuration);

let body:any = {};

apiInstance.albumsGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
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


