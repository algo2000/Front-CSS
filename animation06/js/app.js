import{Point} from './point.js';

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

        this.pos = new Point();
        this.target = new Point();

        this.downPos = new Point();
        this.mousePos = new Point();
        this.mousePos2 = new Point();
        this.prevPos = new Point();
        this.isDown = false;

        this.target = null;
        this.radius = 0;
        this.minRadius = 0;

        requestAnimationFrame(this.animate.bind(this));
        addEventListener('pointerdown',this.onDown.bind(this),false);
        addEventListener('pointermove',this.onMove.bind(this),false);
        addEventListener('pointerup',this.onUp.bind(this),false);
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
        requestAnimationFrame(this.animate.bind(this));

        this.ctx.fillStyle = '#2C5E9E';
        this.ctx.rect(0, 0, this.stageWidth, this.stageHeight);
        this.ctx.fill();
        
        if(this.target)
        {
            const move = this.target.clone().subtract(this.pos).reduce(0.08);
            this.pos.add(move);
            this.centerPos = this.pos.clone().add(this.mousePos2);
            this.radius = this.distanceCal(this.downPos,this.centerPos);
    
            if(this.isDown)
            {
                this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);
                this.ctx.fillStyle = '#2C5E9E';
                let region = new Path2D();
                region.rect(0, 0, this.stageWidth, this.stageHeight);
                region.arc(this.downPos.x, this.downPos.y, this.radius, 0, Math.PI*2);
                this.ctx.fill(region, 'evenodd');
            }
        }
        // if(this.radius <= this.minRadius)
        // {
            
        //     let region = new Path2D();
        //     region.rect(0, 0, this.stageWidth, this.stageHeight);
        //     if(this.flg)
        //     {
        //         region.arc(this.mousePosX, this.mousePosY, this.radius, 0, Math.PI*2);
        //         this.radius+=30;
        //     }

        //     this.ctx.fillStyle = '#2C5E9E';
        //     this.ctx.fill(region, 'evenodd');
        // }
        // else
        // {
        //     this.canvas.style.zIndex = -100;
        // }

        if(this.target)
        {
            this.ctx.fillStyle = "blue";

            this.ctx.beginPath();
            this.ctx.arc(this.downPos.x, this.downPos.y, 8, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.fillStyle = "red";
            this.ctx.beginPath();
            this.ctx.arc(this.mousePos.x, this.mousePos.y, 8, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.fillStyle = "green";
            this.ctx.beginPath();
            this.ctx.arc(this.centerPos.x, this.centerPos.y, 8, 0, Math.PI * 2);
            this.ctx.fill();
    
            this.ctx.beginPath();
            this.ctx.moveTo(this.downPos.x,this.downPos.y);
            this.ctx.lineTo(this.mousePos.x,this.mousePos.y);
            this.ctx.lineTo(this.centerPos.x, this.centerPos.y);
            this.ctx.stroke();
        }
    }

    distanceCal(point1,point2)
    {
        const result = Math.sqrt(Math.pow(point2.x - point1.x,2) + Math.pow(point2.y - point1.y,2));
        return result;
    }
    onDown(e)
    {
        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;

        this.startPos = this.mousePos.clone(); 
        this.downPos = this.mousePos.clone(); 
        this.pos = this.mousePos.clone(); 
        this.mousePos2 = this.mousePos.clone().subtract(this.pos);

        this.isDown = true;   
    }

    onMove(e)
    {
        if(this.isDown)
        {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;

            this.target = this.startPos.clone().add(this.mousePos).subtract(this.downPos);
        }
    }
    onUp(e)
    {
        this.target = null;
        this.isDown = false;
    }
}

window.onload = () =>
{
    new App();
}