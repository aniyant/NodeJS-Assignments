const { User, Task } = require('../models');
const twilio = require('twilio');
const config = require('../config/config');

const client = twilio(config.twilio.accountSid, config.twilio.authToken);

const initiateVoiceCalls = async () => {
    const tasks = await Task.findAll({ where: { priority: 0 } }); // Fetch tasks with highest priority
    const users = await User.findAll({ order: [['priority', 'ASC']] });

    for (const user of users) {
        const userTasks = tasks.filter(task => task.user_id === user.id);
        for (const task of userTasks) {
            await client.calls.create({
                url: 'http://twimlets.com/holdmusic?Bucket=com.twilio.music.ambient',
                to: user.phone_number,
                from: config.twilio.fromPhone
            });
        }
    }
};

module.exports = initiateVoiceCalls;
