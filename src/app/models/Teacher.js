module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define('Teacher', {
        teacherId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        dob: {
            type: DataTypes.DATE,
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        timestamps: false
    });
    
    Teacher.associate = models => {
        Teacher.hasOne(models.Account, { foreignKey: 'teacherId' });
    };

    return Teacher;
}

