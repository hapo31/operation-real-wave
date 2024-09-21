# .SongsApi

All URIs are relative to *http://localhost:3000/msr/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**songCidGet**](SongsApi.md#songCidGet) | **GET** /song/{cid} | 指定した楽曲の詳細を取得


# **songCidGet**
> SongCidGet200Response songCidGet()


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

**SongCidGet200Response**

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


