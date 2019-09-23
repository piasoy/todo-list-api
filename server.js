var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

var todoList = [
    {
        id: 1,
        todo: "Implement a REST API"
    },
    {
        id: 2,
        todo: "second thing to do"
    }
];

//GET /api/todos
app.get('/api/todos', function(req, res, next){
    res.send(todoList)
 })

// GET /api/todos/:id
// This should respond with the information for the matching todo item
// by id.
// If the matching todo does not exist, the server should respond
// with a 404 status code.

app.get('/api/todos/:id', function(req, res, next){
    const todoItem = todoList.find(function(item){    
        return item.id.toString() === req.params.id       
    })
    if (!todoItem){
        res.status(404).send('status code 400')
    } else {
        res.send(todoItem)
    }
})


// POST /api/todos
// This should take the body of the request and add it to todoList.
// Remember to generate a unique id for the new todo item.
// This endpoint should respond with the new item with it's id.
app.post('/api/todos', function(req, res, next){   
    let newId = todoList.length + 1
    let newPost={}
    newPost.id = newId
    newPost.todo = req.body.todo
    todoList.push(newPost)
    res.send(newPost);
  
})


// PUT /api/todos/:id
app.put('/api/todos/:id', function(req, res, next){
    const todoItem = todoList.find(function(item){    
        return item.id.toString() === req.params.id       
    })
    if (!todoItem){
        res.status(404).send('status code 400')
    } else {
        todoItem.isComplete = true
        res.send(todoItem)       
    }
})

// DELETE /api/todos/:id
app.delete('/api/todos/:id', function(req, res, next){
    const todoItem = todoList.find(function(item){    
        return item.id.toString() === req.params.id       
    })
    if (!todoItem){
        res.status(404).send('status code 400')
    } else {
        let deleted = todoList.splice(req.params.id-1, 1)
        console.log(`deleted`, deleted)
        res.send('deletion successful')
       
    }

})

app.listen(3000, function(){ 
    console.log('Todo List API is now listening on port 3000...');
})