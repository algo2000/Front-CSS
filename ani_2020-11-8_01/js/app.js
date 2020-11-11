import{Point} from './point.js';

class App
{
    //생성자
    constructor(str)
    {
        this.object = document.getElementsByClassName(str);
        
        //리사이즈 이벤트 화면 크기 변화시
        window.addEventListener('resize', this.resize.bind(this),false);
        this.resize();

        this.object.addEventListener('mousewheel', this.onWheel.bind(this),false);

        requestAnimationFrame(this.animate.bind(this));
    }

    //스크린 사이즈를 가져옴
    resize()
    {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
    }

    animate(t)
    {
        requestAnimationFrame(this.animate.bind(this));
    }

    onWheel(e)
    {
        
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