// check off todos by clicking
$("ul").on("click", "li", function(){//when an li is clicked inside an existing ul
  $(this).toggleClass("completed");
});
//click on X to delete todo
$("ul").on("click", "span", function(e){//same as above had to add the listener to the existing ul so any new child spans are created they also are counted from parent
  //$(this).parent().remove();//remove removes, and the parent removes the hole li not just the span
  $(this).parent().fadeOut(500, function(){//fadeout then remove
    $(this).remove();
  });
  e.stopPropagation();//stops the span click event from going to parent li click event
});

$("input[type='text']").keypress(function(e){
  if(e.which === 13){//13 is character 'Return/Enter'
    var todoEntered = $(this).val();//grab form text and add to var
    if(todoEntered.indexOf("<") === -1 && todoEntered.indexOf("&lt") === -1 ){//sanitize all the things
      $(this).val("");//should empty the input field
      $("ul").append("<li><span><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span> " + todoEntered + "</li>");//add text entered to li's
    }
  }
});

$(".fa-plus").click(function(){
  $("input[type='text']").fadeToggle();
});
