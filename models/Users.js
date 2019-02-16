module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", { //simple Sequelize model with email, hash, and salt
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        hash: {
            type: DataTypes.STRING(1500),
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return User;
}