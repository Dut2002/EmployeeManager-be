module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("Role", {
        roleId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        roleName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        }
    },
    {
        sequelize,
        timestamps: false
    });

    Role.associate = models => {
        Role.hasMany(models.Account, { foreignKey: 'roleId' });
    };

    return Role;
}