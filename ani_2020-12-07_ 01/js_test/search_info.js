class Search_info
{
    constructor()
    {
        this.ids = [];
        this.idLengh;
        this.nowPage = 0;
        this.nowIds = [];
        this.isLoading = false;
    }

    static initIds(ids)
    {
        this.ids = ids;
        this.idLengh = ids.length;
        this.nowPage = 0;
    }

    static getNowIds()
    {
        this.nowIds = this.ids.slice(this.nowPage*3,this.nowPage*3+3);
        this.nowPage++;
        this.isLoading = true;
        return this.nowIds;
    }
}
new Search_info();