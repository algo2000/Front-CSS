var stageWidth;
var stageHeight;
var maxTop;
var minTop;
var gap = 0;

var movePosY;
var startPosY;
var startTopPosY;

var isClick = false;

var barAni;

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

$('#drag-bar').on('touchstart',function(e) 
{
    startPosY = e.originalEvent.touches[0].clientY;
    startTopPosY = (Number)($("#contents").css("top").replace("px",""));
    movePosY = e.originalEvent.touches[0].clientY;
    gap = movePosY - startPosY;
    isClick = true;
});

$('#drag-bar').on('touchmove',function(e) 
{
    if(isClick)
    {
        movePosY = e.originalEvent.touches[0].clientY;
        gap = movePosY - startPosY;
        if($('#content').scrollTop() === 0)
        {
            if(maxTop <= startTopPosY + gap && minTop >= startTopPosY + gap)
            {
                $("#contents").css({
                    "top" : startTopPosY + gap +"px"
                });
            }
        }
    }
});

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

$('#content').on('touchend touchstart touchmove',function(e) 
{
    if($('#content').scrollTop() <= 0)
    {
        e.stopPropagation();
        console.log($('#content').scrollTop());
    }
    alert("dafsd");
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