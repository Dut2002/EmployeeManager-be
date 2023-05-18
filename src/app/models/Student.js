
module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        studentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        gender: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                len: [10, 11]
            }
        }
    }, {
        sequelize,
        timestamps: false
    });

    Student.associate = models => {
        Student.hasMany(models.StudentClasses, { foreignKey: 'studentId' });
        Student.hasOne(models.Account, { foreignKey: 'studentId' });
    };

    return Student;
}

