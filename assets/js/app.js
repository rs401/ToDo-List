
myStorage = window.localStorage;
myTodos = JSON.parse(myStorage.getItem("todos"));

class todo {
  constructor(text) {
    this.text = text;
    this.date = Date.now();
    this.completed = false;
    return this;
  }
}

if(myTodos === null || myTodos.length === 0){
  seedTodos();
}
async function seedTodos() {
  myTodos = [];
  myTodos.push(new todo("Wash dishes"));
  await sleep(500);
  myTodos.push(new todo("Wash dishes again"));
  writeToStorage();
}

// myTodos[1].date = 1641155279049;
// myStorage.setItem("todos", JSON.stringify(myTodos));

function compareDate(a, b) {
  if (a.date > b.date) return 1;
  if (b.date > a.date) return -1;
  return 0;
}

function compareCompleted(a, b) {
  if (a.completed > b.completed) return 1;
  if (b.completed > a.completed) return -1;
  return 0;
}

function writeToStorage(){
  myStorage.setItem("todos", JSON.stringify(myTodos));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

myTodos.sort(compareDate);
myTodos.sort(compareCompleted);

$("#todos-ul").empty();

myTodos.forEach(element => {
  if(element.completed){
    $("#todos-ul").append("<li id=\"" + element.date + "\" class=\"completed\"><span><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span> " + element.text + "</li>");
  } else {
    $("#todos-ul").append("<li id=\"" + element.date + "\"><span><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span> " + element.text + "</li>");
  }
});

// check off todos by clicking
$("#todos-ul").on("click", "li", function(){
  // toggle completed on object
  myTodos.map((td, index) => {
    if(td.date === parseInt($(this).attr("id"))){
      myTodos[index].completed = !myTodos[index].completed;
    }
  });
  writeToStorage();
  $(this).toggleClass("completed");
});
//click on X to delete todo
$("#todos-ul").on("click", "span", function(e){
  // Remove todo from array
  myTodos = myTodos.filter(td => td.date === $(this).id);
  writeToStorage();
  $(this).parent().fadeOut(500, function(){//fadeout then remove
    $(this).remove();
  });
  e.stopPropagation();//stops the span click event from going to parent li click event
});

$("input[type='text']").keypress(function(e){
  if(e.which === 13){//13 is character 'Return/Enter'
    var todoEntered = $(this).val();//grab form text and add to var
    //sanitize all the things
    if(todoEntered.indexOf("<") === -1 && todoEntered.indexOf("&lt") === -1 ){
      $(this).val("");//should empty the input field
      // Create new todo
      var newTodo = new todo(todoEntered);
      // Append new todo
      myTodos.push(newTodo);
      // Write todos to localstorage
      writeToStorage();
      $("#todos-ul").append("<li id=\"" + newTodo.date + "\"><span><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span> " + newTodo.text + "</li>");
    }
  }
});

$(".fa-plus").click(function(){
  $("input[type='text']").fadeToggle();
});
