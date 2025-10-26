const express = require('express');
const app = express();
const port = 3000;
const tasks = require('./task.json');

const taskArray = Array.isArray(tasks) ? tasks : (tasks.tasks || []);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Wlcome to the Express server!');
});

app.get('/tasks', (req, res) => {
    if (!taskArray || taskArray.length === 0) {
        return res.status(404).send('No tasks found');
    }
    taskArray.sort((a, b) => {
        const ta = Date.parse(a.createdAt) || 0;
        const tb = Date.parse(b.createdAt) || 0;
        return tb - ta;
    });


    res.status(200).json(taskArray);

});

app.get('/tasks?completed=true', (req, res) => {
    const completedTasks = taskArray.filter(t => t.completed === true);

    if (completedTasks.length === 0) {
        return res.status(404).send('No completed tasks found');
    }

    res.status(200).json(completedTasks);
});

app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const foundTask = taskArray.find(t => t.id === id);
    if (!foundTask) {
        return res.status(404).send('Task not found');
    }
    res.status(200).json(foundTask);

});

app.get('/tasks/:level', (req, res) => {
    const level = req.params.level;
    const filteredTasks = taskArray.filter(t => t.level === level);
    if (filteredTasks.length === 0) {
        return res.status(404).send('No tasks found with the specified level');
    }
    res.status(200).json(filteredTasks);

});

app.post('/tasks', (req, res) => {
    const { title, description, completed } = req.body;
    if (!title || !description || typeof completed !== 'boolean') {
        return res.status(400).send('Invalid task data');
    }
    const newTask = {
        id: taskArray.length + 1,
        title,
        description,
        completed
    };
    taskArray.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title, description, completed } = req.body;
    const taskIndex = taskArray.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return res.status(404).send('Task not found');
    }
    if (!title || !description || typeof completed !== 'boolean') {
        return res.status(400).send('Invalid task data');
    }
    taskArray[taskIndex] = { id, title, description, completed };

    res.status(200).json(taskArray[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const taskIndex = taskArray.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return res.status(404).send('Task not found');
    }
    taskArray.splice(taskIndex, 1);
    console.log(taskArray);

    res.status(200).send("Task deleted successfully");
});



app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;