export default (sequelize, DataTypes) => {
  const Galery = sequelize.define(
    'galery',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
    }
  );

  Galery.associate = (models) => {
    Galery.belongsTo(models.User, { foreignKey: "creator_id", });
    Galery.hasMany(models.Galeryphoto, { foreignKey: "galery_id", as: 'items' });
  };

  return Galery;
};
