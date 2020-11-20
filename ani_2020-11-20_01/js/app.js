// var startPosY;
// var movePosY;
// var prevMoveY
// var barAni;
// var barAutoAni;
// var speed;
// var isAuto = false;
// var isReturn = false;

// var stageWidth = $('body').width();
// var stageHeight = $('body').height();
// var maxTop = $('body').height()*0.05;
// var minTop = $('body').height()*0.95;

// function setAnimation()
// {
//     barAni = setInterval(function(){
//         if(maxTop <= movePosY && minTop >= movePosY)
//         {
//             $("#contents").css({
//                 "top" : movePosY+"px"
//             });
//         }
//     });    
// }

// function setAnimationAuto()
// {
//     if(speed < 0)
//     {
//         $("#contents").animate({
//             "top" : maxTop + "px"
//         },500);
//         prevMoveY = maxTop;
//         movePosY = maxTop;
//     }
//     else
//     {
//         $("#contents").animate({
//             "top" : minTop + "px"
//         }, 500);
//         prevMoveY = minTop;
//         movePosY = minTop;
//     }
// }

// $('#drag-bar').on('touchstart',function(e) 
// {
//     if(!isAuto)
//     {
//         startPosY = e.originalEvent.touches[0].clientY;
//         setAnimation();
//     }
// });

// $('#drag-bar').on('touchmove',function(e) 
// {
//     if(!isAuto)
//     {
//         movePosY = e.originalEvent.touches[0].clientY;
//         speed = movePosY - prevMoveY;
//         prevMoveY = movePosY;
//         if(Math.abs(speed) > 30)
//         {
//             clearInterval(barAni);
//             isAuto = true;
//             setAnimationAuto();
//             return;
//         }
//     }
// });

// $('#drag-bar').on('touchend',function(e) 
// {
//     if(!isAuto)
//     {
//         console.log(minTop-movePosY);
//         if(Math.abs(minTop-movePosY)<=Math.abs(maxTop-movePosY)*0.3)
//             {
//                 speed = 1;
//             }
//             else
//             {
//                 speed = -1;
//             }
//             clearInterval(barAni);
//             setAnimationAuto();
//     }
//     isAuto = false;
//     clearInterval(barAni);
// });

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

function setAnimation()
{
    barAni = setInterval(function(){
        if(maxTop <= startTopPosY + gap && minTop >= startTopPosY + gap)
        {
            $("#contents").css({
                "top" : startTopPosY + gap +"px"
            });
        }
    });    
}
clearInterval(barAni);

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
    maxTop = stageHeight*0.05;
    minTop = stageHeight*0.95;
}

$('#drag-bar').on('touchstart',function(e) 
{
    startPosY = e.originalEvent.touches[0].clientY;
    startTopPosY = (Number)($("#contents").css("top").replace("px",""));
    movePosY = e.originalEvent.touches[0].clientY;
    gap = movePosY - startPosY;
    isClick = true;
    setAnimation();
});

$('#drag-bar').on('touchmove',function(e) 
{
    if(isClick)
    {
        movePosY = e.originalEvent.touches[0].clientY;
        gap = movePosY - startPosY;
    }
});

$('#drag-bar').on('touchend',function(e) 
{
    isClick = false;
    clearInterval(barAni);
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

    // if(Math.abs(maxTop - top) > Math.abs(minTop - top))
    // {
    //     setAnimationAuto(1);
    // }
    // else
    // {
    //     setAnimationAuto(-1);
    // }
});

function setAnimationAuto(vec)
{
    if(vec < 0)
    {
        $("#contents").animate({
            "top" : maxTop + "px"
        },200);
    }
    else
    {
        $("#contents").animate({
            "top" : minTop + "px"
        }, 200);
    }
}