export class Wall
{
    constructor(x,y)
    {
    }

    update(vecX,vecY)
    {
        this.x += vecX * this.speedX;
        this.y += vecY * this.speedY;
    }
}