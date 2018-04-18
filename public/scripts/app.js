console.log("Sanity Check: JS is working!");
var $toDoList;
var allToDos = []; //empty array

$(document).ready(function(){

  $toDoList = $('#toDoTarget');
 
  $.ajax({
    method: 'GET', //getting all of the data from database
    url: '/todo', //on this url
    success: handleSuccess, //calls handleSuccess on success
    error: handleError //throws error on error
  });



  $(".create").on('click', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST', //post method
      url: '/todo', //url to post on
      data: $('#newToDoForm').serialize(), //serializing the form object
      success: newToDoSuccess,
      error: newToDoError
    });
  });





function getToDoHtml(toDoList) {
  return `<li>
            To Do: <b>${toDoList.task}</b>
            <br />
            How: ${toDoList.description}
            <br />
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${toDoList._id}>Delete</button>
          </li>`;
}

function getAllToDoHtml(toDo) {
  return toDo.map(getToDoHtml).join("");
}

//function to render all posts to view
function render () {
  $toDoList.empty();// empty existing posts from view
  var toDoHtml = getAllToDoHtml(allToDos); // pass `allToDos` into the template function
  $toDoList.append(toDoHtml);// append html to the view
};

function handleSuccess(json) {
  allToDos = json;//assigning the value of the json object into the empty array
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#toDoTarget').text('Failed to load to-dos');
}

function newToDoSuccess(json) {
  $('#newToDoForm input').val(''); //clearing the input fields after successful post
  allToDos.push(json); //pushing all data from the array into json
  render();
}

function newToDoError() {
  console.log('new to do error!');
}

});
