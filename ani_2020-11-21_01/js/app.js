$(document).on('touchstart','body',function(e)
{
});

var isTouch = false;
var mousePos;

$(document).on('touchstart','#contents',function(e)
{
    isTouch = true;
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
});

$(document).on('touchstart touchmove touchend scroll','#content',function(e)
{
    e.stopPropagation();
});