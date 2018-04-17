console.log("Sanity Check: JS is working!");
var $todoList;
var allToDos = [];

$(document).ready(function(){

  $todoList = $('#toDoTarget');
  $.ajax({
    method: 'GET',
    url: '/api/todo',
    success: handleSuccess,
    error: handleError
  });

  $('.create').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/todo',
      data: $('#newToDoForm').serialize(),
      success: newToDoSuccess,
      error: newToDoError
    });
  });









});
