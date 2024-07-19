module.exports = (sequelize, DataTypes) => {
    const Subtask = sequelize.define('Subtask', {
        task_id: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
        paranoid: true,
        timestamps: false
    });

    return Subtask;
};
