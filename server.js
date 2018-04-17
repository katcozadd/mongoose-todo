//Setup and Configuration
//require express in our app
var express  = require('express'),
  bodyParser = require('body-parser');

 //requiring my models 
var Todo     = require('./models/todo');
var db       = require('./models');

//requiring seed 
var toDoList = require('./seed');

// generate a new express app and call it 'app'
var app      = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

//initialize variable to use for our environment port
var port = 3000;




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});


// get all todos
app.get('/api/todos', function todosIndex(req, res) {
  // find all todos in db
  Todo.find(function handleDBTodosListed(err, allTodos) {
    res.json({ todos: allTodos });
  });
});



//port listening
app.listen(port, ()=> {
  console.log(`App is locked and loaded on ${port}`);
});