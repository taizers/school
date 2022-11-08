export default (sequelize, DataTypes) => {
  const Storage = sequelize.define('storage', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Storage.associate = (models) => {
    Storage.belongsTo(models.Storagegroup, {
      foreignKey: 'storagegroup_id',
    });
    Storage.belongsTo(models.User, { foreignKey: 'creator_id', as: 'user' });
  };

  return Storage;
};
