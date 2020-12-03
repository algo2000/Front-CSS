$(document).on("click",".tag-close",function(){
  var $target = $( this ).parent();
  $($target).animate({
    "width" : "0px",
    "height" : "0px"
  }, 200, function() {
    $($target).remove();
  });
});

$(document).on('keydown','#search-input', function(e) {
  if( e.which == 8 || e.which == 46 )
  {
    if($(this).val() === "" && $(".tag").length !== 0)
    {
      var $temp = $(".tag");
      $($temp[($temp.length)-1]).animate({
        "width" : "0px",
        "height" : "0px"
      }, 200, function() {
        $temp[($temp.length)-1].remove();
      });
    }
  }
});