const { Task } = require('../models');

const updateTaskPriorities = async () => {
    const tasks = await Task.findAll();
    const now = new Date();

    tasks.forEach(async (task) => {
        const dueDate = new Date(task.due_date);
        const diff = (dueDate - now) / (1000 * 60 * 60 * 24); // Difference in days

        let priority;
        if (diff < 1) {
            priority = 0;
        } else if (diff < 3) {
            priority = 1;
        } else if (diff < 5) {
            priority = 2;
        }

        await task.update({ priority });
    });
};

module.exports = updateTaskPriorities;
