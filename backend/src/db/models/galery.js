module.exports = (sequelize, DataTypes) => {
  const Galery = sequelize.define(
    'galery',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
  );

  Galery.associate = (models) => {
    Galery.belongsTo(models.User, { onDelete: 'cascade', foreignKey: "creator_id", });
    Galery.hasMany(models.Galeryphoto, { onDelete: 'cascade' });
  };

  return Galery;
};
