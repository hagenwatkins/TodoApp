const router = require('express').Router();

const Todo = require('../models/todos');


router.get('/todos', function(req, res) {
  Todo.find({}).then(function(results) {
    res.render('index', { todos: results })
  })
});

router.post('/todos/:id/deleted', function(req, res) {
  let todoId = req.params.id;
  Todo.remove({ _id: todoId }).then(function(result){
    res.redirect('/todos');
  })

});
router.post('/todos/:id/completed', function (req, res){
  let todoId = req.params.id;
  Todo.findById(todoId)
  .exec()
  .then(function(result){
    result.done = !result.done;
    return result.save();
  }).then(function(result){
    res.redirect('/todos');
  });



})
router.post('/todos', function(req, res) {

  let newTodo = new Todo(req.body);
  newTodo.save().then(function(result){
    console.log(result);
    res.redirect('/todos');
  }).catch(function(err){
    console.log(err)
    res.redirect('/todos');
  });
});


module.exports = router;
