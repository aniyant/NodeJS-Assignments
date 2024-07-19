const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

const Task = require('./task')(sequelize, Sequelize);
const Subtask = require('./subtask')(sequelize, Sequelize);
const User = require('./user')(sequelize, Sequelize);

Task.hasMany(Subtask, { foreignKey: 'task_id' });
Subtask.belongsTo(Task, { foreignKey: 'task_id' });

module.exports = {
    sequelize,
    Task,
    Subtask,
    User
};
