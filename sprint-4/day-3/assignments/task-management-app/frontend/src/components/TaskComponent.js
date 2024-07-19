import React from 'react';

const TaskComponent = ({ task }) => {
    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.due_date}</p>
            <p>Status: {task.status}</p>
        </div>
    );
};

export default TaskComponent;
