module.exports = (sequelize, DataTypes) => { 
    const Account = sequelize.define("Account", {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
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
            allowNull: false
        },
        studentId: {
            type: DataTypes.INTEGER,
        },
        teacherId: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        timestamps: false
    });

    Account.associate = models => {
        Account.belongsTo(models.Student, { foreignKey: 'studentId' });
        Account.belongsTo(models.Teacher, { foreignKey: 'teacherId' });
    };

    return Account;
}