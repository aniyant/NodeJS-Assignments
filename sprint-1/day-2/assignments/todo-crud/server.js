const express = require('express');
const fs = require('fs');

const app = express(); // creating server instance

app.use(express.json()); // applying middleware json 

// Utility functions
const readDatabase = function () {
    return JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
}

const writeDatabase = function (data) {
    fs.writeFileSync('./db.json', JSON.stringify(data, null, 2));
}

// Routes

// Get all todos in database
app.get('/todos', (req, res) => {
    const data = readDatabase();
    res.send(data.todos);
});

// PUT to update the status of even ID todos from false to true
app.put('/todos/updatestatus', (req, res) => {
    const data = readDatabase();
    let updatedCount = 0;
    data.todos.forEach(todo => {
        if (todo.id % 2 === 0 && todo.status === false) {
            todo.status = true;
            updatedCount++;
        }
    });
    writeDatabase(data);
    res.send(`${updatedCount} todos updated.`);
});

// DELETE todos with status true
app.delete('/todos/delete-true', (req, res) => {
    let data = readDatabase();
    const originalLength = data.todos.length;
    data.todos = data.todos.filter(todo => todo.status !== true);
    const deletedCount = originalLength - data.todos.length;
    writeDatabase(data);
    res.json({ message: `${deletedCount} todos deleted.` });
});


// Get todo by id
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = readDatabase();
    const todo = data.todos.find(todo => todo.id === id);
    if (todo) {
        res.send(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

// Post todo
app.post('/todos', (req, res) => {
    const todo = req.body;
    const data = readDatabase();
    todo.id = data.todos.length ? data.todos[data.todos.length - 1].id + 1 : 1;
    data.todos.push(todo);
    writeDatabase(data);
    res.send(todo);
});

// Delete todo by id
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = readDatabase();
    const index = data.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        const [deletedTodo] = data.todos.splice(index, 1);
        writeDatabase(data);
        res.status(200).send(deletedTodo);
    } else {
        res.status(404).send('Todo not found');
    }
});

// Update todo by id
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = readDatabase();
    const index = data.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        data.todos[index] = { ...data.todos[index], ...req.body };
        writeDatabase(data);
        res.send('Todo updated');
    } else {
        res.status(404).send(`Todo not found with id: ${id}`);
    }
})

// Patch todo by id
app.patch('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = readDatabase();
    const index = data.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        const todo = { ...data.todos[index], ...req.body };
        data.todos[index] = todo;
        writeDatabase(data);
        res.status(200).send(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});


// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(4500, () => {
    console.log('Server is running on port 4500');
});
