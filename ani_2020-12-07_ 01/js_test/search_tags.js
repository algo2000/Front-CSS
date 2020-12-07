import {GalleryIdToInfo as galleryIdToInfo} from './galleryIdToInfo.js'
$(document).on('click','#search-btn',function(){
    var aJson = new Object();
    var gii = new galleryIdToInfo();
    var galleryInfoJson;
    
    aJson["order"] = "date";
    aJson.search_tags=input_tag('.tag-text');
    aJson.exclude_tags = new Object();
    var sJson = JSON.stringify(aJson);

    $.ajax({ 
        url : "http://52.160.49.52:8000/search", 
        data : sJson, 
        traditional: true , 
        contentType:"application/json", 
        type : 'POST', 
        dataType:'JSON', 
        success:function(data)
        { 
            Search_info.initIds(data['result']);
            galleryInfoJson = gii.gallery_idsToInfo(Search_info.getNowIds());
            console.log(galleryInfoJson);
            for(var i = 0; i<galleryInfoJson['result'].length;i++)
            {
                console.log($('.cartoon-images')[i]);
                var $tempTag = "<img class='images' src='" + galleryInfoJson['result'][i]['thumbnail_url'] + "'>";
                $($('.cartoon-images')[i]).append($tempTag);
            }
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