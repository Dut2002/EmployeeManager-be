
module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define("Account", {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        actived: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2
        }
    })

    return Account;
}