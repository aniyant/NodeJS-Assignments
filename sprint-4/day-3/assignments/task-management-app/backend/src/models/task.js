module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        due_date: DataTypes.DATE,
        priority: DataTypes.INTEGER,
        status: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
        paranoid: true,
        timestamps: false
    });

    return Task;
};
