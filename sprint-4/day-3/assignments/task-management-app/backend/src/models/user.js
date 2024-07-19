module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        phone_number: DataTypes.STRING,
        priority: DataTypes.INTEGER
    }, {
        timestamps: false
    });

    return User;
};
