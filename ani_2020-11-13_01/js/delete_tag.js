$(document).on("click",".tag-close",function(){
  $( this ).parent().remove();
});

$(document).on('keydown','#search', function(e) {
  if( e.which == 8 || e.which == 46 )
  {
    if($(this).val() === "" && $(".tag").length !== 0)
    {
      var $temp = $(".tag");
      $temp[($temp.length)-1].remove()
    }
  }
});