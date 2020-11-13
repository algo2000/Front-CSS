var oldVal = "";
$("#text").on("change keyup paste", function() {
    var currentVal = $(this).val();
    console.log(currentVal);
    if(currentVal == oldVal) {
        return;
    }

    $.ajax({
        url: "http://localhost:8080/test",
        type: "POST",
        dataType: "text",
        success: function(result){
            console.log("성공");
        }
    })

    oldVal = currentVal;
});
