module.exports = (sequelize, DataTypes) => {
  const StudentClasses = sequelize.define('StudentClasses', {
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    timestamps: false
  });

  

  return StudentClasses;
}