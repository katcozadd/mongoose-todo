//Setup and Configuration
//require express in our app
var path     = require('path');
var express  = require('express'),
  bodyParser = require('body-parser');

 //requiring my models 
var Todo     = require('./models/todo');
var db       = require('./models');

// generate a new express app and call it 'app'
var app      = express();

//set the view engine 
app.set('views', './views');
app.set('view engine', 'ejs');

// serve static files in public
app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

//initialize variable to use for our environment port
var port = 3000;




// define a root route on localhost:3000/
app.get('/', function (req, res) {
  res.render('index'); //displaying my index.ejs
});

//this route works with my ajax get to display the seeded data on dom
app.get('/todo', function (req, res, next) {
    console.log('hello') // shows in terminal
    db.Todo.find(function(err, todo) {
    	if (err) {
    	console.log("index error: " + err);
      	res.sendStatus(500);
    	}
    res.json(todo);
    });
});

// create new todo
app.post('/todo', function(req, res) {
  // create new todo with form data (`req.body`)
  var newTodo = req.body;
    db.Todo.create(newTodo, function(err, newListItem){
    if (err) {
      console.log("index error: " + err)
      res.sendStatus(500)  
    } else {
      //executed only in the success case, where theres no error
      res.json(newListItem);  
    }
});
});

// delete to do
app.delete('/todo/:id', function (req, res) {
  // get to do id from url params (`req.params`)
  db.Todo.findOneAndRemove({_id: req.params.id}, function(err, todos) {
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    // get the id of the to do to delete
    let toDoToDelete = req.params.id;
    res.json(toDoToDelete);
  });
});

// update todo list item
app.put('/todo/:id', function(req,res){
  console.log(req.params.id);
  let task = req.body.task;
  console.log(task);
  let description = req.body.description;
  console.log(description);

  db.Todo.findOneAndUpdate(
    {_id: req.params.id}, {$set:{task: task, description: description}}, {new: true}, function (err, update) {
        if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
      } else {
        //doc is the json object that is being sent (refer to 'json' callback in JS functions)
        console.log(update);
        res.json(update);
    }
  });

});

//port listening
app.listen(port, ()=> {
  console.log(`App is locked and loaded on ${port}`);
});