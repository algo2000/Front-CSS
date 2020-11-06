import {Point} from './point.js';
import {Dialog} from './dialog.js';

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

        this.mousePos = new Point();
        this.curItem = null;

        this.items = [];
        this.total = 1;

        for(let i = 0; i < this.total; i++)
        {
            this.items[i] = new Dialog();
        }

        //리사이즈 이벤트 화면 크기 변화시
        window.addEventListener('resize', this.resize.bind(this),false);
        //스크린 사이즈를 가져옴
        this.resize();

        //바인드를 this를 넣어줌으로 인해 현재 클래스가 바인드된다.
        requestAnimationFrame(this.animate.bind(this));
        addEventListener('pointerdown',this.onDown.bind(this),false)
        addEventListener('pointermove',this.onMove.bind(this),false)
        addEventListener('pointerup',this.onUp.bind(this),false)

        // addEventListener('touchstart',this.onDown.bind(this),false)
        // addEventListener('touchmove',this.onMove.bind(this),false)
        // addEventListener('touchend',this.onUp.bind(this),false)
    }

    //스크린 사이즈를 가져옴
    resize()
    {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth*2;
        this.canvas.height = this.stageHeight*2;
        this.ctx.scale(2,2);

        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetX = 3;
        this.ctx.shadowBlur = 6;
        this.ctx.shadowColor = 'rgba(0,0,0,0.1)';
        this.ctx.lineWidth = 2;

        for(let i = 0; i<this.items.length; i++)
        {
            this.items[i].resize(this.stageWidth,this.stageHeight);
        }
    }

    animate(t)
    {
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);
        requestAnimationFrame(this.animate.bind(this));

        for(let i = 0; i< this.items.length; i++)
        {
            this.items[i].animate(this.ctx);
        }

        if(this.curItem)
        {
            this.ctx.fillStyle = '#ff4338';
            this.ctx.strokeStyle = '#ff4338';

            this.ctx.beginPath();
            this.ctx.arc(this.test.x, this.test.y, 8, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(this.mousePos.x, this.mousePos.y, 8, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(this.curItem.centerPos.x, this.curItem.centerPos.y, 8, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.moveTo(this.test.x,this.test.y);
            this.ctx.lineTo(this.mousePos.x,this.mousePos.y);
            this.ctx.lineTo(this.curItem.centerPos.x, this.curItem.centerPos.y);
            this.ctx.stroke();
        }
    }

    onDown(e)
    {
        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;

        for(let i = this.items.length -1; i>=0; i--)
        {
            const item = this.items[i].down(this.mousePos.clone());
            if(item)
            {
                this.curItem = item;
                const index = this.items.indexOf(item);
                //해당 오브젝트를 아이템 배열에서 빼내어 다시 푸시
                this.items.push(this.items.splice(index, 1)[0]);
                break;
            }
        }
    }

    onMove(e)
    {
        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;
        
        for(let i = 0; i< this.items.length; i++)
        {
            this.items[i].move(this.mousePos.clone());
        }
    }

    onUp(e)
    {
        this.curItem = null;

        for(let i = 0; i < this.items.length; i++)
        {
            this.items[i].up();
        }
    }
}

window.onload = () =>
{
    new App();
}