class CartoonlistSize
{
    constructor()
    {
        this.cartoonList = document.getElementById("cartoon-list");
        this.cartoonContents = document.getElementsByClassName("cartoon-contents");
        window.addEventListener('resize', this.resize.bind(this),false);
        this.resize();
    }

    resize()
    {
        this.stageWidth = document.getElementById("cartoon-list").clientWidth;
        this.stageHeight = document.getElementById("cartoon-list").clientHeight;

        this.gap = this.stageHeight/((this.cartoonContents.length)*3);
        this.contentsHeight = this.gap*2*0.8;
        console.log(this.gap);

        for(let i = 0; i<this.cartoonContents.length;i++)
        {
            this.cartoonContents[i].style.height = this.contentsHeight + "px";
            this.cartoonContents[i].style.top = this.gap * ((i*2)+1) + "px";
            console.log(this.gap * (i*2+1) + "px");
        }
    }
    getStyle(ob)
    {
        return window.getComputedStyle(ob,null);
    }
}

window.onload = () =>
{
    if (isMobile()) 
    {
        // console.log('mobile 접속'); 
        new CartoonlistSize();
    }
    else
    {
        new CartoonlistSize();
    }
}

function isMobile() 
{
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}