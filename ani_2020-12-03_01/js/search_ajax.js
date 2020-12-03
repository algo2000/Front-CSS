var json = null;
$(document).on("click","body",function(e)
{
    if(!$(e.target).hasClass("auto-element")&&!$(e.target).is("input#search-input"))
    {
        $("#auto-complete").animate({
            "height" : "0px",
            "padding" : "0px"
        }, 200, function() {
            $("#auto-complete").empty();
            $("#search-tag-box").css({
                "border-radius":"10px"
            });
        })
    }
});
$(document).on("focusin propertychange paste input","#search-input",function(){
    var currentVal = $(this).val();
    if(currentVal === "")
    {
        $("#auto-complete").animate({
            "height" : "0px",
            "padding" : "0px"
        }, 200, function() {
            $("#auto-complete").empty();
            $("#search-tag-box").css({
                "border-radius":"10px"
            });
        })
        return;
    }

    let result = [];
    const regex = new RegExp('^[0-9a-zA-Z]([0-9a-zA-Z])*:'+currentVal, 'gi');
    for(let i = 0; i<json.length;i++)
    {
        if(json[i].search(regex)!=-1)
        {
            result.push(json[i]);
            if(result.length == 8)
            {
                break;
            }
        }
    }
    var obj = result;
    $("#auto-complete").empty();
    if(obj.length !== 0)
    {
        $("#search-tag-box").css({
            "border-radius":"10px 10px 0px 0px"
        });
        $("#auto-complete").css("padding","0px 20px 10px 20px");
    }
    else
    {
        $("#search-tag-box").css({
            "border-radius":"10px"
        });
        $("#auto-complete").css("padding","0px")
    }
    $("#auto-complete").css("height","auto");
    for(let i = 0; i<obj.length;i++)
    {
        var tempTag = $("<p/>");
        tempTag.addClass("auto-element");
        tempTag = tempTag.text(obj[i]);
        tempTag.css("height", "0px");
        tempTag.appendTo("#auto-complete");
        tempTag.animate({
            "height": "18px"
        });
    }
});

$(document).ready(function(){
    $.ajax({
        url: "/search",
        type: "POST",
        dataType: "json",
        success: function (result) {
            json = result;
        }
    });
});
