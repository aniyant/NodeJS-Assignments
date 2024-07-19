const app = require('./app');
const taskPriorityUpdate = require('./cron/taskPriorityUpdate');
const voiceCalling = require('./cron/voiceCalling');
const cron = require('node-cron');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Schedule cron jobs
cron.schedule('0 0 * * *', taskPriorityUpdate); // Runs every day at midnight
cron.schedule('0 8 * * *', voiceCalling); // Runs every day at 8 AM
