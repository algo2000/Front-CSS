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

        //0:메인, 1: 로그인
        this.pagePath = 0;

        this.isCanvasVisible = true;
        this.slideArea = 170;
        this.arcSize = 100;
        this.arcX = 0;

        this.pos = new Point();
        this.downPos = new Point();
        this.setDownPos = new Point();
        this.mousePos = new Point();
        this.mousePos2 = new Point();

        this.signinPos = new Point();

        this.isDown = false;
        this.isAuto = false;

        this.maxSize = 0;
        this.target = null;
        this.radius = 0;
        this.prevRadius = 0;
        this.speed = 0;

        //리사이즈 이벤트 화면 크기 변화시
        window.addEventListener('resize', this.resize.bind(this),false);
        //스크린 사이즈를 가져옴
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
        addEventListener('touchstart',this.onDown.bind(this),false);
        addEventListener('touchmove',this.onMove.bind(this),false);
        addEventListener('touchend',this.onUp.bind(this),false);
    }

    sin()
    {
        if(this.arcX > 2*Math.PI)
        {
            this.arcX = 0;
        }
        this.arcX+=0.05;
        return 10*Math.sin(this.arcX)+110;
    }

    //스크린 사이즈를 가져옴
    resize()
    {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth*2;
        this.canvas.height = this.stageHeight*2;
        this.ctx.scale(2,2);

        this.signinPos.x = this.stageWidth-70;
        this.signinPos.y = this.stageHeight-70;
        
        var $target =  $('.sign-in-pos');

        $($target).css({
            "left" : this.signinPos.x + "px",
            "top" : this.signinPos.y + "px"
        });
    }

    animate(t)
    {

        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);

        if(this.isCanvasVisible)
        {
            requestAnimationFrame(this.animate.bind(this));
            
            this.ctx.beginPath();
            var gra = this.ctx.createLinearGradient(0, 0, this.stageWidth, this.stageHeight);
            gra.addColorStop(0, '#FFA953');
            gra.addColorStop(1, '#FF7474');
            this.ctx.fillStyle = gra;
            this.ctx.rect(0, 0, this.stageWidth, this.stageHeight);
            this.ctx.fill();
            this.ctx.closePath();
            
            this.ctx.beginPath();
            this.ctx.moveTo(this.signinPos.x,this.signinPos.y);
            this.ctx.arc(this.signinPos.x, this.signinPos.y, this.sin(), 0, 2 * Math.PI);
            this.ctx.fillStyle = "rgba(255, 169, 83, 0.3)";;
            this.ctx.fill();
            this.ctx.closePath();
            
            if(this.target && !this.isAuto)
            {
                const move = this.target.clone().subtract(this.pos).reduce(0.08);
                this.pos.add(move);
                this.centerPos = this.pos.clone().add(this.mousePos2);
                this.radius = this.distanceCal(this.downPos,this.centerPos);

                this.speed = this.radius - this.prevRadius;

                this.prevRadius  = this.radius;

                if(this.speed >= 30)
                {
                    this.setDownPos = this.downPos;
                    this.isAuto = true;
                    this.maxSize = Math.max(this.distanceCal(this.setDownPos,new Point(0,0)),this.distanceCal(this.setDownPos,new Point(this.stageWidth,0)),this.distanceCal(this.setDownPos,new Point(0,this.stageHeight)),this.distanceCal(this.setDownPos,new Point(this.stageWidth,this.stageHeight)));
                }

                this.setClip(this.downPos);
            }

            if(this.isAuto)
            {
                if(this.radius>this.maxSize)
                {
                    this.canvas.style.zIndex = - 100;
                    this.isCanvasVisible = false;
                    
                    if(this.pagePath == 1)
                    {
                        window.location.replace("/sign-in");
                    }
                }
                else
                {
                    this.setClip(this.setDownPos,this.speed);
                }
            }

            if(this.radius>=0 && !this.isDown)
            {
                this.setClip(this.downPos,-10);
            }
        }
    }

    setClip(point,radiusDelta = 0)
    {
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);

        var gra = this.ctx.createLinearGradient(0, 0, this.stageWidth, this.stageHeight);
        gra.addColorStop(0, '#FFA953');
        gra.addColorStop(1, '#FF7474');
        this.ctx.fillStyle = gra;
        let region = new Path2D();
        region.rect(0, 0, this.stageWidth, this.stageHeight);
        region.arc(point.x, point.y, this.radius, 0, Math.PI*2);
        this.radius += radiusDelta;
        this.ctx.fill(region, 'evenodd');

        if(this.pagePath==1)
        {
            this.ctx.beginPath();
            this.ctx.moveTo(this.signinPos.x,this.signinPos.y);
            this.ctx.arc(point.x, point.y, this.radius+10, 0, Math.PI*2);
            this.ctx.fillStyle = "rgba(255, 169, 83, 0.3)";
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    distanceCal(point1,point2)
    {
        const result = Math.sqrt(Math.pow(point2.x - point1.x,2) + Math.pow(point2.y - point1.y,2));
        return result;
    }

    onDown(e)
    {
        this.mousePos.x = e.touches[0].clientX;
        this.mousePos.y = e.touches[0].clientY;
        
        var $target =  $('.guide-box');
        $($target).animate({
            "opacity" : "0%"
        }, 200, function() {
            $($target).css('display','none');
        });

        if(this.mousePos.x > this.stageWidth - this.slideArea &&
            this.mousePos.y > this.stageHeight - this.slideArea)
            {
                this.pagePath = 1;
            }
            else
            {
                this.pagePath = 0;
            }

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
            this.mousePos.x = e.touches[0].clientX;
            this.mousePos.y = e.touches[0].clientY;

            this.target = this.startPos.clone().add(this.mousePos).subtract(this.downPos);
        }
    }
    onUp(e)
    {
        this.target = null;
        this.isDown = false;
        if(!this.isAuto)
        {
            var $target =  $('.guide-box');
            $($target).css('display','block');
            $($target).animate({
                "opacity" : "100%"
            }, 500, function()
            {
                $($target).css('display','block');
            });
        }
    }
}

window.onload = () =>
{
    new App();
}