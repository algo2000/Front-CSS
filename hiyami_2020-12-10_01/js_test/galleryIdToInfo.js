import {Create_cartoonList_style as createCartoonList} from './create_cartoonList_style.js'
export class GalleryIdToInfo
{
    constructor()
    {

    }
    /**
     * 원하는 페이지의 info를 가져옴
     * @param {Array} ids 갤러리 아이디 리스트 최대 3개
     */
    gallery_idsToInfo(ids) 
    {  
        var aJson = new Object();
        var imgUrl = new Array();
        aJson['gallery_ids'] = new Array();
        aJson['gallery_ids'] = ids;
        var sJson = JSON.stringify(aJson);
        $.ajax({ 
            url : App.serverUrl+"/get-gallery-metadata", 
            data : sJson, 
            traditional: true, 
            contentType:"application/json", 
            type : 'POST', 
            dataType:'JSON', 
            success:function(galleryInfo)
            {
                for(var i = 0; i<galleryInfo['result'].length;i++) 
                {
                    imgUrl.push(galleryInfo['result'][i]['thumbnail_url']);
                }
                var ccl = new createCartoonList();
                var aJson = new Object();
                aJson['url'] = new Array();
                aJson['url'] = imgUrl;
                var sJson = JSON.stringify(aJson);
                $.ajax({ 
                    url : App.serverUrl+"/get-url-data", 
                    url : App.serverUrl+"/image-url-to-base64", 
                    data : sJson, 
                    traditional: true , 
                    contentType:"application/json", 
                    type : 'POST', 
                    dataType:'JSON', 
                    success:function(imgUrl)
                    {
                        for(var i = 0; i<galleryInfo['result'].length;i++) 
                        {
                            galleryInfo['result'][i]['thumbnail_url'] = imgUrl[i];

                            var cartoon = ccl.createCartoonList(galleryInfo['result'][i]);
                            console.log(cartoon);
                            $($('#cartoon-list-box > #contents > .loader')[0]).after(cartoon);
                            $($('#cartoon-list-box > #contents > .loader')[0]).remove();
                            // $('#cartoon-list-box > #contents').append(ccl.createCartoonLoading());
                            //$($('#cartoon-list-box > #contents > .loader')[0]).empty();
                        }
                        Search_info.isLoading = false;
                    }
                });
            }
        });
    }
}