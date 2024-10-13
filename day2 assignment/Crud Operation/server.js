const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Helper function to read todos from the db.json file
function readTodos() {
  const data = fs.readFileSync('./db.json');
  return JSON.parse(data);
}

// Helper function to write todos back to the db.json file
function writeTodos(todos) {
  fs.writeFileSync('./db.json', JSON.stringify(todos, null, 2));
}

// GET all todos
app.get('/todos', (req, res) => {
  const todos = readTodos();
  res.json(todos.todos);
});

// POST a new todo
app.post('/todos', (req, res) => {
  const todos = readTodos();
  const newTodo = {
    id: todos.todos.length + 1, // Incremental ID
    task: req.body.task,
    status: req.body.status || false // Default status is false
  };
  todos.todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

// PUT: Update the status of all todos with even ID from false to true
app.put('/todos/update-even', (req, res) => {
  const todos = readTodos();
  todos.todos.forEach(todo => {
    if (todo.id % 2 === 0 && todo.status === false) {
      todo.status = true;
    }
  });
  writeTodos(todos);
  res.json({ message: 'Even ID todos updated' });
});

// DELETE: Remove all todos where status is true
app.delete('/todos/delete-completed', (req, res) => {
  let todos = readTodos();
  todos.todos = todos.todos.filter(todo => todo.status === false);
  writeTodos(todos);
  res.json({ message: 'Completed todos deleted' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
