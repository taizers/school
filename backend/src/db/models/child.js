export default (sequelize, DataTypes) => {
  const Child = sequelize.define('child', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  });

  Child.associate = (models) => {
    Child.belongsTo(models.Class, { foreignKey: 'class_id' });
  };

  return Child;
};
