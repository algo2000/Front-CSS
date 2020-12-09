import {GalleryIdToInfo as galleryIdToInfo} from './galleryIdToInfo.js'
import {Create_cartoonList_style as createCartoonList} from './create_cartoonList_style.js'
$(document).on('scroll',function(e){
    var gii = new galleryIdToInfo();
    var ccl = new createCartoonList();
    var scrollT = $(this).scrollTop(); //스크롤바의 상단위치
    var scrollH = $(this).height(); //스크롤바를 갖는 div의 높이
    var contentH = $('body').height(); //문서 전체 내용을 갖는 div의 높이
    if(scrollT + scrollH +1 >= contentH) { // 스크롤바가 아래 쪽에 위치할 때
        if(!Search_info.isLoading)
        {
            gii.gallery_idsToInfo(Search_info.getNowIds());
            Search_info.isLoading = false;
        }
    }
});

$(document).on('click','.cartoon-images', (e) =>
{
    var aJson = new Object();
    aJson['gallery_id'] = $(e.target.offsetParent.children[0]).text();
    var sJson = JSON.stringify(aJson);
    console.log(sJson);
    $.ajax({ 
        url : App.serverUrl+"/get-gallery-url", 
        data : sJson, 
        traditional: true, 
        contentType:"application/json", 
        type : 'POST', 
        dataType:'JSON', 
        success:function(data)
        {
            var test = new Array();
            test = data;
            console.log(test);
            App.emptySlide(2);
            App.setPage(2);
            var page = 0;
            for(var repeat = 0; repeat < (data.length/3)+1; repeat++)
            {
                // imageLinkToBase64(data.slice(page,page+3));
                var aJson = new Object();
                aJson['url'] = new Array();
                aJson['url'] = data.slice(page,page+3);
                page = page+3;
                var sJson = JSON.stringify(aJson);
                console.log(sJson);
                $.ajax({ 
                    url : App.serverUrl+"/image-url-to-base64", 
                    data : sJson, 
                    traditional: true ,
                    contentType:"application/json", 
                    type : 'POST', 
                    dataType:'JSON', 
                    success:function(imgs)
                    { 
                        for(var i = 0; i<imgs.length;i++)
                        {
                            $('#js-3').append("<img src='"+imgs[i]+"'/>");
                        }
                    }
                });
            }
            console.log(data.length);
        }
    });
});

function imageLinkToBase64(url)
{
    var aJson = new Object();
    aJson['url'] = new Array();
    aJson['url'] = url;
    var sJson = JSON.stringify(aJson);
    console.log(sJson);
    $.ajax({ 
        url : App.serverUrl+"/image-url-to-base64", 
        data : sJson, 
        traditional: true ,
        contentType:"application/json", 
        type : 'POST', 
        dataType:'JSON', 
        success:function(imgs)
        { 
            page = page+3;
            for(var i = 0; i<imgs.length;i++)
            {
                $('#js-3').append("<img src='"+imgs[i]+"'/>");
            }
        }
    });
}