console.log("Sanity Check: JS is working!");
var $toDoList;
var allToDos = [];

$(document).ready(function(){

  $toDoList = $('#toDoTarget');
 
  $.ajax({
    method: 'GET',
    url: '/todo',
    success: handleSuccess,
    error: handleError
  });



  $(".create").on('click', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/todo',
      data: $('#newToDoForm').serialize(),
      success: newToDoSuccess,
      error: newToDoError
    });
  });





function getToDoHtml(toDoList) {
	console.log('test')
  return `<hr>
          <p>
            <b>${toDoList.task}</b>
            by ${toDoList.description}
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${toDoList._id}>Delete</button>
          </p>`;
}

function getAllToDoHtml(toDo) {
  return toDo.map(getToDoHtml).join("");
}

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $toDoList.empty();

  // pass `allToDos` into the template function
  var toDoHtml = getAllToDoHtml(allToDos);

  // append html to the view
  $toDoList.append(toDoHtml);
};

function handleSuccess(json) {
	console.log(json);
  allToDos = json;
  render();
  // getAllToDos();
}

function handleError(e) {
  console.log('uh oh');
  $('#toDoTarget').text('Failed to load to dos, is the server working?');
}

function newToDoSuccess(json) {
  $('#newToDoForm input').val('');
  console.log(allToDos);
  allToDos.push(json);
  render();
}

function newToDoError() {
  console.log('new to do error!');
}

});
