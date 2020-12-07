import {GalleryIdToInfo as galleryIdToInfo} from './galleryIdToInfo.js'
import {Create_cartoonList_style as createCartoonList} from './create_cartoonList_style.js'
$(document).on('click','#search-btn',function(e){
    var aJson = new Object();
    var gii = new galleryIdToInfo();
    var ccl = new createCartoonList();
    var galleryInfoJson;
    
    aJson["order"] = "date";
    aJson.search_tags=input_tag('.tag-text');
    aJson.exclude_tags = new Object();
    var sJson = JSON.stringify(aJson);

    $.ajax({ 
        url : App.serverUrl+"/search", 
        data : sJson, 
        traditional: true , 
        contentType:"application/json", 
        type : 'POST', 
        dataType:'JSON', 
        success:function(data)
        { 
            App.emptySlide(1);
            App.setPage(1);
            console.log(sJson);
            $('#cartoon-list-box > #contents').empty();
            Search_info.initIds(data['result']);

            for(var repeat = 0; repeat<3;repeat++)
            {
                galleryInfoJson = gii.gallery_idsToInfo(Search_info.getNowIds());
                console.log(galleryInfoJson);
                for(var i = 0; i<galleryInfoJson['result'].length;i++)
                {
                    var cartoon = ccl.createCartoonList(galleryInfoJson['result'][i]);
                    $('#cartoon-list-box > #contents').append(cartoon);
                }
            }
            e.preventDefault();
            App.swiper.slideTo(1, 0);
        },
        error:function()
        {
            alert("Search failed");
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