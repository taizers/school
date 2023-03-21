export default (sequelize, DataTypes) => {
  const Class = sequelize.define('class', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  });

  Class.associate = (models) => {
    Class.belongsTo(models.User, { foreignKey: 'classteach_id', as: 'teacher' });
    Class.hasMany(models.Child, {
      foreignKey: 'class_id',
      as: 'children',
    });
  };

  return Class;
};
