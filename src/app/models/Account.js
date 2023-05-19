module.exports = (sequelize, DataTypes) => { 
    const Account = sequelize.define("Account", {
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
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
            allowNull: false
        },
    }, {
        sequelize,
        timestamps: false
    });

    Account.associate = models => {
        Account.hasOne(models.Student, { foreignKey: 'email' });
        Account.hasOne(models.Teacher, { foreignKey: 'email' });
        // Account.belongsTo(models.Student, { foreignKey: 'studentId' });
        // Account.belongsTo(models.Teacher, { foreignKey: 'teacherId' });
    };
    return Account;
}