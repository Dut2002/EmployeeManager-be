
module.exports = (sequelize, DataTypes) => {
    const Class = sequelize.define('Class', {
        classId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        grade: {
            type: DataTypes.TINYINT,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        schoolYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        }
    }, {
        sequelize,
        timestamps: false
    });

    Class.associate = models => {
        Class.hasMany(models.StudentClasses, { foreignKey: 'classId' });
    };
    return Class;
}