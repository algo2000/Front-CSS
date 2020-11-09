import{Point} from './point.js';

class App
{
    //생성자
    constructor(str)
    {
        this.classes = document.getElementsByClassName(str);
        
        //리사이즈 이벤트 화면 크기 변화시
        window.addEventListener('resize', this.resize.bind(this),false);
        
        this.flg = false;
        this.target = null;
        this.totalCount = this.classes.length;
        this.marginCount = this.totalCount-1;
        this.isHover = false;
        this.itemLeft = [];

        this.hoverRectWith = this.rectWidth + (this.rectWidth/2);
        
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
        for(let i = 0; i< this.classes.length; i++)
        {
            this.classes[i].addEventListener('mouseout',this.onLeave.bind(this),false);
            this.classes[i].addEventListener('mouseover',this.onDown.bind(this),false);
        }
    }

    //스크린 사이즈를 가져옴
    resize()
    {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        let totalCount = this.totalCount;
        let marginCount = this.marginCount;

        let stageWidth = this.stageWidth;

        if(this.stageWidth < 1500)
        {
            stageWidth = 1500;
        }

        if(this.totalCount > 6)
        {
            totalCount = 6;
            marginCount = 5;
        }

        this.margin = stageWidth / ((10 * totalCount)+marginCount);
        this.rectWidth = (stageWidth - (marginCount*this.margin))/totalCount;
        this.rectHeight = this.rectWidth;
        this.imageAreaHeight = this.rectHeight/2;

        for(let i = 0; i< this.classes.length; i++)
        {
            this.classes[i].style.left = (this.margin * (i+1)) + (this.rectWidth * i) + "px";
            this.classes[i].style.width = this.rectWidth + "px";
            this.classes[i].style.height = this.rectHeight + "px";
            this.itemLeft[i] = Number((this.margin * (i+1)) + (this.rectWidth * i));
            this.classes[i].id = i
            if(this.classes[i].getElementsByClassName("image-area")[0])
            {
                this.classes[i].getElementsByClassName("image-area")[0].style.height = this.imageAreaHeight + "px";
            }
        }
        document.getElementById("margin").style.left = (this.margin * (this.classes.length+1)) + (this.rectWidth * this.classes.length) + "px";
    }

    animate(t)
    {
        requestAnimationFrame(this.animate.bind(this));
    }

    onDown(e)
    {
        let target = e.target.offsetParent;
        target.style.boxShadow = "0px 0px 10px black";
        target.style.width = this.rectWidth + (this.rectWidth/2) + "px";
        target.style.height = this.rectHeight + (this.rectHeight/2) + "px";
        target.style.zIndex = "10";

        if(Number(target.id) == this.totalCount-1)
        {
            target.style.left = this.itemLeft[Number(target.id)] - Number((this.rectWidth/2)) + "px";
        }
        else if(Number(e.target.offsetParent.id) != 0)
        {
            target.style.left = this.itemLeft[Number(target.id)] - Number((this.rectWidth/2)/2) + "px";
        }
        let targetImageArea = e.target.offsetParent.getElementsByClassName("image-area")[0];
        if(targetImageArea)
        {
            targetImageArea.style.height = (this.rectHeight + (this.rectHeight/2))/2 + "px";
        }
    }
    onLeave(e)
    {
        let targetImageArea = e.target.offsetParent.getElementsByClassName("image-area")[0];
        if(targetImageArea)
        {
            targetImageArea.style.height = this.rectHeight/2 + "px";
        }
        let target = e.target.offsetParent;
        target.style.boxShadow = "0px 0px 3px black";
        target.style.width = this.rectWidth + "px";
        target.style.height = this.rectHeight + "px";
        target.style.left = this.itemLeft[Number(target.id)] + "px";
        target.style.zIndex = "0";
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
        console.log('mobile 접속'); 
    } 
    else 
    {
        new App("pic");
        new App("pic2");
    }
}

function isMobile() 
{
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}