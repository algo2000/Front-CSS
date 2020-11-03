export class Point
{
    constructor(x,y,radius,rgba)
    {
        this.x = x;
        this.y = y;
        this.speedX = 1;
        this.speedY = 1;
        this.radius = radius;
        this.vecX = 1;
        this.vecY = 1;
        this.rgba = rgba;
    }

    update()
    {
        this.x += this.vecX * this.speedX;
        this.y += this.vecY * this.speedY;
    }
    draw(ctx)
    {
        ctx.beginPath();
        ctx.fillStyle = this.rgba;

        const cx = this.x;
        const cy = this.y;

        ctx.moveTo(cx,cy);
        ctx.arc(cx,cy,this.radius,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}