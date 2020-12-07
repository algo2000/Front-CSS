class Search_info
{
    constructor()
    {
        this.ids = [];
        this.idLengh;
        this.nowPage = 0;
        this.nowIds = [];
    }

    static initIds(ids)
    {
        this.ids = ids;
        this.idLengh = ids.length;
        this.nowPage = 0;
    }

    static getNowIds()
    {
        this.nowIds = this.ids.splice(this.nowPage*3,3);
        this.nowPage++;
        return this.nowIds;
    }
}
new Search_info();