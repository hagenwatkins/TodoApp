const express = require('express');
const mustacheEx = require('mustache-express');
const mongoose = require('mongoose');
const app = express();
const todoRoutes = require('./routes/todos');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;



app.use(bodyParser.urlencoded({extended: true}));

const mustacheExpressInstance = mustacheEx();
mustacheExpressInstance.cache = null;

app.engine('mustache', mustacheExpressInstance);

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.use('/', todoRoutes);

let todos = {todos: [{description: 'Make a todo site', done: false}]};

let url = 'mongodb://localhost:27017/awesome_todos';

mongoose.connect(url, { useMongoClient: true })
  .then(function(){
    console.log('Connected to the database');
  });

app.listen(4444, function(){
  console.log('Rocafella! roll with the winners')
});
