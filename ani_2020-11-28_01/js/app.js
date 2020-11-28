var signBox = $('.sign-box');

var page = 0;


function boxVisibility(exPageNum, nowPageNum)
{
    $(signBox[exPageNum]).animate({
        'opacity' : '0%'
    },300, function()
    {
        $(signBox[exPageNum]).css('display','none');
    });

    $(signBox[nowPageNum]).animate({
        'opacity' : '100%'
    }, 300, function()
    {
        $(signBox[nowPageNum]).css('display','block');
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
        if(page+1 === signBox.length)
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
    if(page+1 === signBox.length)
    {
        var form = $("form[name=sign-form]").serialize();
        var requestPath = "sign-in";
        if($('#sign-button').text() === "Sign Up")
        {
            requestPath = "sign-up";
        }
        $.ajax({
            url: "/"+requestPath,
            type: "POST",
            data: form,
            success: function(result)
            {
                if(result === "200")
                {
                    if(requestPath === "sign-in")
                    {
                        $(location).attr('href', '/');
                    }
                    else
                    {
                        $(location).attr('href', '/sign-in');
                    }
                }
                else
                {
                    alert(result);
                }
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