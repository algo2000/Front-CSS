export class Create_cartoonList_style
{
    constructor(){}
    createCartoonList(json)
    {
        var cartoonBoxDiv = $('<div/>');
        cartoonBoxDiv.addClass('cartoon-box');

        var cartoonTitleA = $('<a/>');
        cartoonTitleA.addClass('cartoon-title');
        cartoonTitleA.html(json['title']);

        cartoonBoxDiv.append(cartoonTitleA);

        var cartoonContentsBoxDiv = $('<div/>');
        cartoonContentsBoxDiv.addClass('cartoon-contents-box');

        var cartoonImagesDiv = $('<div/>');
        cartoonImagesDiv.addClass('cartoon-images');

        var gallery_id = $('<div/>').css('display','none');
        gallery_id.html(json['gallery_id']);

        cartoonImagesDiv.append(gallery_id);

        var imagesImg = $('<img/>');
        imagesImg.addClass('images');
        imagesImg.attr("src", json['thumbnail_url']);

        cartoonImagesDiv.append(imagesImg);
        cartoonContentsBoxDiv.append(cartoonImagesDiv);

        var cartoonInfoDiv = $('<div/>');
        cartoonInfoDiv.addClass('cartoon-info');

        var cartoonTableDiv = $('<table/>');
        cartoonTableDiv.addClass('cartoon-table');

        var tempTr;
        var tempTd;

        tempTr = $('<tr/>')

        tempTd = $('<td/>');
        tempTd.html('Type');
        tempTr.append(tempTd);

        tempTd = $('<td/>');
        tempTd.html(json['type']);
        tempTr.append(tempTd);

        cartoonTableDiv.append(tempTr);

        tempTr = $('<tr/>')

        tempTd = $('<td/>');
        tempTd.html('Language');
        tempTr.append(tempTd);

        tempTd = $('<td/>');
        tempTd.html(json['language']);
        tempTr.append(tempTd);

        cartoonTableDiv.append(tempTr);

        tempTr = $('<tr/>')

        tempTd = $('<td/>');
        tempTd.html('Tags');
        tempTr.append(tempTd);

        tempTd = $('<td/>');
        var tags = json['tags'];
        for(var i = 0; i<tags.length;i++)
        {
            var tagInfo = tags[i].split(':');
            var tagsSpan = $('<span/>');
            tagsSpan.addClass('tags'+ ' ' + tagInfo[0]+'-tags');
            var tagsA = $('<a/>').html(tagInfo[1]);
            tagsSpan.append(tagsA);
            tempTd.append(tagsSpan);
        }
        tempTr.append(tempTd);

        cartoonTableDiv.append(tempTr);
        cartoonInfoDiv.append(cartoonTableDiv);
        cartoonContentsBoxDiv.append(cartoonInfoDiv);
        cartoonBoxDiv.append(cartoonContentsBoxDiv);

        var cartoonPageA = $('<a/>');
        cartoonPageA.addClass('cartoon-page');
        cartoonPageA.html(json['file_length']+' page');

        cartoonBoxDiv.append(cartoonPageA);

        return cartoonBoxDiv;
    }

    createCartoonLoading()
    {
        // <div class="loader">
        //     <div class="loading">
        // </div>

        var loaderDiv = $('<div/>');
        loaderDiv.addClass('loader');

        var loadingDiv = $('<div/>');
        loadingDiv.addClass('loading');

        loaderDiv.append(loadingDiv);

        return loaderDiv;
    }

    createCartoonImgLoading()
    {
        var loaderDiv = $('<div/>');
        loaderDiv.addClass('loader');
        loaderDiv.addClass('loader-img');

        var loadingDiv = $('<div/>');
        loadingDiv.addClass('loading');

        loaderDiv.append(loadingDiv);

        return loaderDiv;
    }
}

/* <div class="cartoon-box">
    <a class="cartoon-title">s.s.s.mono</a>
    <div class="cartoon-contents-box">
        <div class="cartoon-images">
            <img class="images" src="../image/IMG_4408.jpeg">
        </div>
        <div class="cartoon-info">
            <table class="cartoon-table">
                <tr>
                    <td>Type</td>
                    <td>manga</td>
                </tr>
                <tr>
                    <td>Language</td>
                    <td>korean</td>
                </tr>
                <tr>
                    <td>Tags</td>
                    <td>
                        <span class="tags female-tags"><a>Big Breasts</a></span>
                        <span class="tags female-tags"><a>Mind Control</a></span>
                        <span class="tags male-tags"><a>Nakadashi</a></span>
                        <span class="tags female-tags"><a>Schoolgirl Uniform</a></span>
                        <span class="tags male-tags"><a>Teacher</a></span>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <a class="cartoon-page">77</a>
</div> */