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

        //리사이즈 이벤트 화면 크기 변화시
        window.addEventListener('resize', this.resize.bind(this),false);
        //스크린 사이즈를 가져옴
        this.resize();

        this.radius = 0;
        this.flg = false;
        this.minRadius = 0;

        requestAnimationFrame(this.animate.bind(this));
        addEventListener('pointerdown',this.onDown.bind(this),false);
    }

    //스크린 사이즈를 가져옴
    resize()
    {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth*2;
        this.canvas.height = this.stageHeight*2;
        this.ctx.scale(2,2);
    }

    animate(t)
    {
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);

        if(this.radius <= this.minRadius)
        {
            requestAnimationFrame(this.animate.bind(this));
            let region = new Path2D();
            region.rect(0, 0, this.stageWidth, this.stageHeight);
            if(this.flg)
            {
                region.arc(this.mousePosX, this.mousePosY, this.radius, 0, Math.PI*2);
                this.radius+=30;
            }

            this.ctx.fillStyle = '#2C5E9E';
            this.ctx.fill(region, 'evenodd');
        }
        else
        {
            this.canvas.style.zIndex = -100;
        }
    }

    abc(x,y)
    {
        const result = Math.sqrt(Math.abs(x*x) + Math.abs(y*y));
        return result;
    }
    onDown(e)
    {
        if(this.flg == false)
        {
            this.flg = true;
            this.mousePosX = e.clientX;
            this.mousePosY = e.clientY;

            this.minRadius = Math.max(this.abc(0-this.mousePosX,0-this.mousePosY),this.abc(0-this.mousePosX,this.stageHeight-this.mousePosY),this.abc(this.stageWidth-this.mousePosX,this.stageHeight-this.mousePosY),this.abc(this.stageWidth-this.mousePosX,0-this.mousePosY))
        }
    }
}

window.onload = () =>
{
    new App();
}