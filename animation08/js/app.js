import{Point} from './point.js';

class App
{
    //생성자
    constructor()
    {
        this.classes = document.querySelectorAll(".pic");
        this.classes.forEach(element => {
            element.style.boxShadow = "0px 0px 8px gray";
        });   
        //리사이즈 이벤트 화면 크기 변화시
        window.addEventListener('resize', this.resize.bind(this),false);

        this.flg = false;
        this.target = null;
        this.totalCount = this.classes.length;
        this.marginCount = this.totalCount+1;
        this.isHover = false;
        
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
        for(let i = 0; i< this.classes.length; i++)
        {
            if(this.isHover == false)
            {
                this.classes[i].addEventListener('mouseover',this.onDown.bind(this),false);
            }
            else if(this.isHover)
            {
                this.classes[i].addEventListener('mouseout',this.onLeave.bind(this),false);
            }
        }
    }

    //스크린 사이즈를 가져옴
    resize()
    {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.margin = this.stageWidth / ((10 * this.totalCount)+this.marginCount);
        this.rectWidth = (this.stageWidth - (this.marginCount*this.margin))/this.totalCount;
        this.rectHeight = this.rectWidth/3*2;

        for(let i = 0; i< this.classes.length; i++)
        {
            this.classes[i].style.left = (this.margin * i+1) + (this.rectWidth * i) + "px";
            this.classes[i].style.width = this.rectWidth + "px";
            this.classes[i].style.height = this.rectHeight + "px";
        }
    }

    animate(t)
    {
        requestAnimationFrame(this.animate.bind(this));
    }

    onDown(e)
    {
        e.target.style.boxShadow = "0px 10px 50px black";
        e.target.style.width = this.rectWidth + (this.rectWidth/2) + "px";
        e.target.style.height = this.rectHeight + (this.rectHeight/2) + "px";   
        e.target.style.left = Number(window.getComputedStyle(e.target,null).left.replace("px","")) - Number((this.rectWidth/2)/2) + "px";
        e.target.style.zIndex = "10";
    }
    onLeave(e)
    {
        e.target.style.boxShadow = "0px 0px 8px gray";
        e.target.style.width = this.rectWidth + "px";
        e.target.style.height = this.rectHeight + "px";
        e.target.style.left = Number(window.getComputedStyle(e.target,null).left.replace("px","")) + Number((this.rectWidth/2)/2) + "px";
        e.target.style.zIndex = "0";
    }
}

window.onload = () =>
{
    new App();
}