import {GalleryIdToInfo as galleryIdToInfo} from './galleryIdToInfo.js'
import {Create_cartoonList_style as createCartoonList} from './create_cartoonList_style.js'
$(document).on('click','#search-btn',function(e){
    var aJson = new Object();
    var gii = new galleryIdToInfo();
    var ccl = new createCartoonList();
    
    aJson["order"] = "date";
    aJson.search_tags=input_tag('.tag-text');
    aJson.exclude_tags = new Object();
    var sJson = JSON.stringify(aJson);

    App.emptySlide(1);
    App.setPage(1);
    e.preventDefault();
    App.swiper.slideTo(1, 0);

    $.ajax({ 
        url : App.serverUrl+"/search", 
        data : sJson, 
        traditional: true , 
        contentType:"application/json", 
        type : 'POST', 
        dataType:'JSON', 
        success:function(data)
        { 
            $('#cartoon-list-box > #contents').empty();
            Search_info.initIds(data['result']);

            for(var i = 0; i < 10; i++)
            {
                Search_info.isLoading = true;
                var nowToonCount = Search_info.getNowIds();
                for(var j = 0; j < 3; j++)
                {
                    $('#cartoon-list-box > #contents').append(ccl.createCartoonLoading());
                }
                gii.gallery_idsToInfo(nowToonCount);
            }
        },
        error:function()
        {
            alert("Search failed");
            App.emptySlide(1);
            App.swiper.slideTo(0, 0);
        }
    });
});

function input_tag(id)
{
    var aJson = new Object();
    var tags = $(id);

    for(var i = 0; i<tags.length; i++)
    {
        var tagText = $(tags[i]).text();
        var tagHash = tagText.split(':');
        if(aJson[tagHash[0]] === undefined)
        {
            aJson[tagHash[0]] = new Array();
        }
        aJson[tagHash[0]].push(tagHash[1]);
    }
    return aJson;
}
  