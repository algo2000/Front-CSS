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
        ($('.sign-input')[page]).focus();
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

$(document).on('keydown','.sign-input', function(e)
{
    if(e.keyCode==13)
    {
        if(page+1 === signInBox.length)
        {
            $('#sign-button').click();
        }
        else
        {
            ($('.next-button')[page]).click();
        }
    }
});

$(document).on('click','#sign-button', function()
{
    if(page+1 === signInBox.length)
    {
        var form = $("form[name=sign-in-form]").serialize();
        $.ajax({
            url: "/sign-in",
            type: "POST",
            data: form,
            success: function(result)
            {
                alert(result);
            },
            error: function()
            {
                alert("Failed to connect to server");
            }
        });
    }
    else
    {
        return false;
    }
});