var startPosY;
var movePosY;
var prevMoveY
var barAni;
var barAutoAni;
var speed;
var isAuto = false;
var isReturn = false;

var stageWidth = $('body').width();
var stageHeight = $('body').height();
var maxTop = $('body').height()*0.05;
var minTop = $('body').height()*0.95;

function setAnimation()
{
    barAni = setInterval(function(){
        if(maxTop <= movePosY && minTop >= movePosY)
        {
            $("#contents").css({
                "top" : movePosY+"px"
            });
        }
    });    
}

function setAnimationAuto()
{
    if(speed < 0)
    {
        $("#contents").animate({
            "top" : maxTop + "px"
        },500);
        prevMoveY = maxTop;
        movePosY = maxTop;
    }
    else
    {
        $("#contents").animate({
            "top" : minTop + "px"
        }, 500);
        prevMoveY = minTop;
        movePosY = minTop;
    }
}

$('#drag-bar').on('touchstart',function(e) 
{
    if(!isAuto)
    {
        startPosY = e.originalEvent.touches[0].clientY;
        setAnimation();
    }
});

$('#drag-bar').on('touchmove',function(e) 
{
    if(!isAuto)
    {
        movePosY = e.originalEvent.touches[0].clientY;
        speed = movePosY - prevMoveY;
        prevMoveY = movePosY;
        if(Math.abs(speed) > 30)
        {
            clearInterval(barAni);
            isAuto = true;
            setAnimationAuto();
            return;
        }
    }
});

$('#drag-bar').on('touchend',function(e) 
{
    if(!isAuto)
    {
        console.log(minTop-movePosY);
        if(Math.abs(minTop-movePosY)<=Math.abs(maxTop-movePosY)*0.3)
            {
                speed = 1;
            }
            else
            {
                speed = -1;
            }
            clearInterval(barAni);
            setAnimationAuto();
    }
    isAuto = false;
    clearInterval(barAni);
});