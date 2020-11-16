$(document).on("click",".auto-element",function(){
  var text = $( this ).text();

  for(let i = 0; i < $(".tag-text").length; i++)
  {
    if($($(".tag-text")[i]).text().toLowerCase() == text.toLowerCase())
    {
      return;
    }
  }

  var $tempTag = $(
      "<div class='tag'>"+
      "<div class='tag-text'>"+
      text+
      "</div>"+
      "<div class='tag-close'>"+
      "<svg xmlns='http://www.w3.org/2000/svg' width='9' height='11' viewBox='0 0 5.829 7.558'>"+
      "<g transform='translate(0.406 0.292)'>"+
      "<line x1='5.017' y2='6.974' fill='none' stroke='#efefef' stroke-width='1'/>"+
      "<line x2='5.017' y2='6.974' fill='none' stroke='#efefef' stroke-width='1'/>"+
      "</g>"+
      "</svg>"+
      "</div>"+
      "</div>");
  var tagName = text.split(':')[0];
  $tempTag.css("background-color",generateColorByTag(tagName.toLowerCase()));
  $('#tags').append($tempTag);
  $('#search').val("");
  $("#auto-complete").animate({
    "height" : "0px"
  }, 200, function() {
    $("#auto-complete").empty();
    $("#search-tags").css({
      "border-radius":"10px"
    });
    $('#tags').css("height","auto");
    $('.tag').css("height","24px");
    $('#search_box').css("height","auto");
    $("#auto-complete").css("height","auto");
  });
});

function generateColorByTag(str)
{
  switch(str)
  {
    case "tag":
      return "#00264B";
      break;
    case "artist":
      return "#002E5A";
      break;
    case "series":
      return "#003D77";
      break;
    case "character":
      return "#004D96";
      break;
    case "language":
      return "#0054A3";
      break;
    case "male":
      return "#0061BC";
      break;
    case "female":
      return "#016BCE";
      break;
    case "group":
      return "#0076E5";
      break;
    default:
      return "#00264B"
  }
}