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
            for(var j = 0; j < 3; j++)
            {
                $('#cartoon-list-box > #contents').append(ccl.createCartoonLoading());
            }
            gii.gallery_idsToInfo(Search_info.getNowIds());
        }
    }
});

$(document).on('click','.cartoon-images', (e) =>
{
    var aJson = new Object();
    aJson['gallery_id'] = $(e.target.offsetParent.children[0]).text();
    var sJson = JSON.stringify(aJson);
    var ccl = new createCartoonList();
    $.ajax({ 
        url : App.serverUrl+"/get-gallery-url", 
        data : sJson, 
        traditional: true, 
        contentType:"application/json", 
        type : 'POST', 
        dataType:'JSON', 
        success:function(data)
        {
            App.emptySlide(2);
            App.setPage(2);

            var imgMap = new Map();
            for(var value = 0; value < data.length; value++)
            {
                imgMap.set(data[value], value);

                var imgDiv = $('<div/>');
                imgDiv.attr('id',value);
                imgDiv.append(ccl.createCartoonImgLoading());
                $('#js-3').append(imgDiv);
            }

            for(var i = 0; i<data.length; i++)
            {
                imageLoad(data[i],imgMap);
            }
            console.log(data.length);
        }
    });
});

function imageLoad(imgData,map)
{
    var aJson = new Object();
    aJson['url'] = imgData;
    var sJson = JSON.stringify(aJson);
    $.ajax({ 
        url : App.serverUrl+"/get-url-data", 
        data : sJson, 
        traditional: true ,
        type : 'POST', 
        xhr: function() { // Seems like the only way to get access to the xhr object
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob'
            return xhr;
        },
        success:function(data)
        {
            var url = window.URL || window.webkitURL;
            var img = url.createObjectURL(data);

            var id = map.get(imgData);
            $('#js-3 > #'+id).empty();
            $('#js-3 > #'+id).append("<img src='"+img+"'/>");
        }
    });
}