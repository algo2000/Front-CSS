let json = require("./tags.json");
// console.log(json);
let result = [];
var count = 0;
let text = "pos";
const regex = new RegExp('^[0-9a-zA-Z]([0-9a-zA-Z])*:'+text, 'gi');
// for(let i = 0; i<json.length;i++)
// {
//     if(json[i].search(regex)!=-1)
//     {
//         result.push(json[i]);
//         if(result.length == 5)
//         {
//             break;
//         }
//     }
// }

json.some(data =>{
    if(data.search(regex)!=-1)
    {
        result.push(data);
        if(result.length == 5)
        {
            return true;
        }
    }
});

result.forEach(element => {
    console.log(element);
});