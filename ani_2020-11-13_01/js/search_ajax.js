$(document).on("click","body",function(e)
{
    if(!$(e.target).hasClass("auto-element")&&!$(e.target).is("input#search"))
    {
        $("#auto-complete").empty();
        $("#search-tags").css({
            "border-radius":"10px"
        });
    }
});
$(document).on("focusin propertychange paste input","#search",function(){
    var currentVal = $(this).val();

    $.ajax({
        url: "/search",
        type: "POST",
        dataType : "json",
        data:
            {
                searchData : currentVal
            },
        success: function(result){
            var obj = result;
            $("#auto-complete").empty();
            if(obj.length !== 0)
            {
                $("#search-tags").css({
                    "border-radius":"10px 10px 0px 0px"
                });
            }
            else
            {
                $("#search-tags").css({
                    "border-radius":"10px"
                });
            }

            for(let i = 0; i<obj.length;i++)
            {
                var tempTag = $("<p/>");
                tempTag.addClass("auto-element");
                tempTag.text(obj[i].name + ":" + obj[i].value).appendTo("#auto-complete");
            }
        }
    })
});
