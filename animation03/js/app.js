import
{
    BoxShow
}from './boxShow.js';

class App
{
    //생성자
    constructor()
    {
        //body태그에 canvas태그를 추가
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        //body 태그에 캔버스 추가
        //document.body.appendChild(this.canvas);
        document.getElementById("js").appendChild(this.canvas);

        this.boxShow = new BoxShow();

        //리사이즈 이벤트 화면 크기 변화시
        window.addEventListener('resize', this.resize.bind(this),false);
        //스크린 사이즈를 가져옴
        this.resize();

        //바인드를 this를 넣어줌으로 인해 현재 클래스가 바인드된다.
        requestAnimationFrame(this.animate.bind(this));
    }

    //스크린 사이즈를 가져옴
    resize()
    {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth*2;
        this.canvas.height = this.stageHeight*2;
        this.ctx.scale(2,2);

        this.boxShow.resize(this.stageWidth,this.stageHeight);
    }

    animate(t)
    {
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);
        this.boxShow.draw(this.ctx);
        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () =>
{
    new App();
}