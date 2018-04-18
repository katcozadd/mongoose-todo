// This file allows us to seed our application with data
var db = require('./models');

var todo_list = [
  {
    task: "Post letter to Nana",
    description: "Go to the post office and drop letter in the post box"

  },
  {
    task: "File Taxes",
    description: "Cry and give away lots of money"

  },
  {
    task: "Buy new plant",
    description: "Go to nursery and pick out a lil cutie for home"

  },
  {
    task: "Call mom",
    description: "Say hey mom I love you a lot"

  },
    {
    task: "Buy Rosé",
    description: "And 'accidently' drink it all"

  },
    {
    task: "Eat Avocado",
    description: "Put the avocado on toast, or salad or tacos... or all of those options."

  }
  ];

// remove all records that match {} -- which means remove ALL records
db.Todo.remove({}, function(err, todo){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all todos');

    // create new records based on the array todo_list
    db.Todo.create(todo_list, function(err, todo){
      if (err) { return console.log('err', err); }
      console.log("created", todo.length, "todos");
      process.exit();
    });
  }
});
