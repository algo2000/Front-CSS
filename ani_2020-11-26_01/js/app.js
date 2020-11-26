var signInBox = $('.sign-in-box');

var page = 0;


function boxVisibility(exPageNum, nowPageNum)
{
    $(signInBox[exPageNum]).animate({
        'opacity' : '0%'
    },300, function()
    {
        $(signInBox[exPageNum]).css('display','none');
    });

    $(signInBox[nowPageNum]).animate({
        'opacity' : '100%'
    }, 300, function()
    {
        $(signInBox[nowPageNum]).css('display','block');
    });
}

$(document).on('click','.next-button', function()
{
    boxVisibility(page,++page);
});

$(document).on('click','.back-button', function()
{
    boxVisibility(page,--page);
});