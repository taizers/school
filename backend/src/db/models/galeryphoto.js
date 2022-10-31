module.exports = (sequelize, DataTypes) => {
  const Galeryphoto = sequelize.define(
    'galeryphoto',
    {
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
  );

  Galeryphoto.associate = (models) => {
    Galeryphoto.belongsTo(models.Galery, { onDelete: 'cascade', foreignKey: "galery_id", });
  };

  return Galeryphoto;
};
