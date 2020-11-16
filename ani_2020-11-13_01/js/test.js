let json = require("./tags.json");
console.log(json);
let result = [];

let text = "anal";
const regex = new RegExp(text, 'gi');
for(let i = 0; i<json.length;i++)
{
    if(json[i].search(regex)!=-1)
    {
        result.push(json[i]);
        if(result.length == 5)
        {
            break;
        }
    }
}

result.forEach(element => {
    console.log(element);
});