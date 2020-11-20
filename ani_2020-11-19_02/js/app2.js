var movePosY;
var barAni;
var barAutoAni;
var speed;

var stageHeight = $('body').height();
var maxTop = $('body').height()*0.05;
var minTop = $('body').height()*0.95;

function setAnimationAuto()
{
    if(speed < 0)
    {
        $("#contents").animate({
            "top" : maxTop + "px"
        },500);
    }
    else
    {
        $("#contents").animate({
            "top" : minTop + "px"
        }, 500);
    }
}

$('#drag-bar').on('touchmove',function(e) 
{
    movePosY = e.originalEvent.touches[0].clientY;
    if(maxTop <= movePosY && minTop >= movePosY)
    {
        $("#contents").css({
            "top" : movePosY+"px"
        });
    }
});

$('#drag-bar').on('touchend',function(e) 
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
    setAnimationAuto();
});