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




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});


//To Do Page with all of the to dos - index.ejs
app.get('/todo', function (req, res) {
    console.log('hello') // shows in terminal
    db.Todo.find(function(err, todo) {
    	if (err) {
    	console.log("index error: " + err);
      	res.sendStatus(500);
    	}
    res.render('index', {todo: todo});
    });
});


//port listening
app.listen(port, ()=> {
  console.log(`App is locked and loaded on ${port}`);
});