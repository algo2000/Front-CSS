var stageWidth;
var stageHeight;
var maxTop;
var minTop;

var isTouch = false;
var isClick = false;

var startPos;
var movePos;
var startTopPos;
var gap;

$( document ).ready( function(){
    $( window ).resize( function(){
        initSet();
    });
    initSet();
});

function initSet()
{   
    stageWidth = (Number)($( window ).width());
    stageHeight = (Number)($( window ).height());        
    maxTop = stageHeight*0.07;
    minTop = stageHeight*0.93;
    $("#contents").animate({
        "top" : minTop + "px"
    },100);
}

$(document).on('touchstart','#contents',function(e)
{
    isTouch = true;
    startPos = e.originalEvent.touches[0].clientY;
    movePos = e.originalEvent.touches[0].clientY;
    gap = movePos - startPos;
    startTopPos = (Number)($("#contents").css("top").replace("px",""));

    $('body').css("overflow","hidden");
});
$(document).on('touchmove','#contents',function(e)
{
    if(isTouch)
    {
        movePos = e.originalEvent.touches[0].clientY;
        gap = movePos - startPos;
        
        if(maxTop <= startTopPos + gap && minTop >= startTopPos + gap)
        {
            $("#contents").css({
                "top" : startTopPos + gap +"px"
            });
        }
    }
});
// $(document).on('touchend','#contents',function(e)
// {
//     isTouch = false;
//     $('body').css("overflow","auto");
// });

$('#drag-bar').on('touchend',function(e) 
{
    isClick = false;
    var top = (Number)($("#contents").css("top").replace("px",""))
    var ratioM;
    var ratioP;
    if(gap>=0)
    {
        ratioP = 0.2;
        ratioM = 1 - ratioP;
    }
    else
    {
        ratioM = 0.2;
        ratioP = 1 - ratioM;
    }

    if(maxTop <= top && top <= stageHeight*ratioP)
    {
        setAnimationAuto(-1);
    }
    else
    {        
        setAnimationAuto(1);
    }
});

function setAnimationAuto(vec)
{
    if(vec < 0)
    {
        $("#contents").animate({
            "top" : maxTop + "px"
        },100);
    }
    else
    {
        $("#contents").animate({
            "top" : minTop + "px"
        }, 100, function()
        {
            $('#content').scrollTop(0);
        });
    }
}

$(document).on('touchstart touchmove touchend','#content',function(e)
{
    e.stopPropagation();
});