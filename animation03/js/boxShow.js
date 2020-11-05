import
{
    Point
}from './point.js';

export class BoxShow
{
    constructor()
    {
    }

    resize(stageWidth, stageHeight)
    {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.point = [];

        for(let i = 0; i<50; i++)
        {
            this.rgba = "rgba("+ this.getRandom(0,256) +","+ this.getRandom(0,256) +","+ this.getRandom(0,256) +",0.5)"
            this.radius = this.getRandom(50,500)
            this.spawnX = this.getRandom(0,this.stageWidth-100);
            this.spawnY = this.getRandom(0,this.stageHeight-100);
            this.point[i] = new Point(this.spawnX,this.spawnY,this.radius,this.rgba);
            this.point[i].vecX = this.getRandom(0,2)>1 ? -1:1;
            this.point[i].vecY = this.getRandom(0,2)<=1 ? -1:1;
        }
    }

    getRandom(min,max)
    {
        return min + Math.random() * max;
    }

    draw(ctx)
    {
        for(let i = 0; i<this.point.length; i++)
        {
            this.point[i].draw(ctx);
            this.wall01(this.point[i]);
            this.point[i].update();
        }
    }

    wall01(point)
    {
        if(point.y <= point.radius + 0)
        {
            point.vecY = +1;
        }
        if(point.y >= this.stageHeight - point.radius)
        {
            point.vecY = -1;
        }
        if(point.x <= point.radius + 0)
        {
            point.vecX = +1;
        }
        if(point.x >= this.stageWidth - point.radius)
        {
            point.vecX = -1;
        }
    }
}