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


  $toDoList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to, /todo/' + $(this).attr('data-id'))
    $.ajax({
      method: 'DELETE',
      url: '/todo/'+$(this).attr('data-id'),
      success: deleteToDoSuccess,
      error: deleteToDoError
    });
  });

  $toDoList.on('click', '.updateBtn', function() {
    console.log('clicked update button to,  /todo/'+$(this).attr('data-id'));
    $.ajax({
      method: 'PUT',
      url: '/todo/'+$(this).attr('data-id'),
      data: $('#newToDoForm').serialize(),
      success: updateToDoSuccess,
      error: updateToDoError
    });
  });



function getToDoHtml(toDoList) {
  return `<li>
            To Do: <b>${toDoList.task}</b>
            <br />
            How: ${toDoList.description}
            <br />
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${toDoList._id}>Delete</button>
            <button type="button" name="button" class="updateBtn btn btn-warning pull-left" data-id=${toDoList._id}>Update</button>

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
  console.log(json);
  allToDos.push(json); //pushing all data from the array into json
  render();
}

function newToDoError() {
  console.log('new to do error!');
}

function deleteToDoSuccess(json) {
  var toDoId = json;
  console.log('delete toDo', toDoId);
  // find the todo with the correct ID and remove it from our allToDos array
  for(var index = 0; index < allToDos.length; index++) {
    if(allToDos[index]._id === toDoId) {
      allToDos.splice(index, 1);
      break;  
    }
  }
  render();
}

function deleteToDoError() {
  console.log('delete to do error!');
}


function updateToDoSuccess(json) {
  var itemId = json._id;
  for(var i = 0; i < allToDos.length; i++) {
    if(allToDos[i]._id === itemId) {
      allToDos[i].task = json.task;
      allToDos[i].description = json.description;
      console.log(json);
      // break;
  }
   render();
}
};

function updateToDoError() {
  console.log('delete to do error!');
}

});
