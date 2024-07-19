import React, { useState, useEffect } from 'react';
import TaskComponent from './components/TaskComponent';
import { createTask } from './services/apiService';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        // Fetch tasks here
    }, []);

    const handleCreateTask = async () => {
        const taskData = {
            title: 'New Task',
            description: 'Task Description',
            due_date: '2024-07-14'
        };
        try {
            const response = await createTask(taskData, token);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div>
            <h1>Task Management App</h1>
            {tasks.map(task => (
                <TaskComponent key={task.id} task={task} />
            ))}
            <button onClick={handleCreateTask}>Create Task</button>
        </div>
    );
};

export default App;
