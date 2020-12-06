class App
{
    constructor()
    {
        
    }

    get slides()
    {
        return this.slides;
    }
    get slideLength()
    {
        return this.slideLength;
    }

    static init(swiper)
    {
        this.swiper = swiper;
    }

    static setSlideInfo()
    {
        this.slides = $('.swiper-slide');
        this.slideLength = this.slides.length;
    }

    /**
     * 해당 레벨의 페이지를 새로 세팅
     * @param {int} pageLevel 페이지의 계층 레벨 (최상위 0 부터 ~ )
     * @param {string} page 삽입하고자 하는 페이지
     */
    static setPage(pageLevel, page)
    {
        this.swiper.appendSlide('<div class="swiper-slide"> ' + page + '</div>');
    }

    /**
     * 입력한 페이지 레벨을 기준, 아래 레벨까지 전부 비우거나, 해당 레벨만 비움
     * @param {int} pageLevel 기준이 되는 페이지 레벨 (해당 페이지 레벨 포함 적용)
     * @param {bool} isAll default true : 아래 레벨까지 전부 비움  false : 해당 레벨만 비움
     */
    static emptySlide(pageLevel, isAll=true)
    {
        this.setSlideInfo();

        if(isAll !== true)
        {
            this.swiper.removeSlide(pageLevel);
        }
        else
        {
            for(var i = pageLevel; i<this.slideLength;i++)
            {
                this.swiper.removeSlide(pageLevel);
            }
        }
    }
}
new App();