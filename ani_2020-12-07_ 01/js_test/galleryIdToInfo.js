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
                            $('#cartoon-list-box > #contents').append(cartoon);
                        }
                    }
                });
                    // this.imageLinkToBase64(galleryInfo,imgUrl);
            }
        });
    }

    /**
     * 이미지 링크로 부터 base64로 변환
     * @param {Array} url 이미지 링크가 담긴 배열
     */
    imageLinkToBase64(galleryInfo,imgUrl)
    {
        var ccl = new createCartoonList();
        var aJson = new Object();
        aJson['url'] = new Array();
        aJson['url'] = imgUrl;
        var sJson = JSON.stringify(aJson);
        $.ajax({ 
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
                    $('#cartoon-list-box > #contents').append(cartoon);
                }
            }
        });
    }
}