export default (sequelize, DataTypes) => {
  const Galeryphoto = sequelize.define('galeryphoto', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Galeryphoto.associate = (models) => {
    Galeryphoto.belongsTo(models.Galery, { foreignKey: 'galery_id' });
  };

  return Galeryphoto;
};
