$(document).on('touchstart','body',function(e)
{
});

var isTouch = false;
var mousePos;

$(document).on('touchstart','#contents',function(e)
{
    isTouch = true;
    $('body').css("overflow","hidden");
});
$(document).on('touchmove','#contents',function(e)
{
    if(isTouch)
    {
        mousePos = e.originalEvent.touches[0].clientY;
        $('#contents').css({
            'top' : mousePos + "px"
        });
    }
});
$(document).on('touchend','#contents',function(e)
{
    isTouch = false;
    $('body').css("overflow","auto");
});

$(document).on('touchstart touchmove touchend','#content',function(e)
{
    e.stopPropagation();
});