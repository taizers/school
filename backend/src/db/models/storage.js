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
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  });

  Storage.associate = (models) => {
    Storage.belongsTo(models.Storagegroup, {
      foreignKey: 'group_id',
      as: 'files',
    });
    Storage.belongsTo(models.User, { foreignKey: 'creator_id', as: 'user' });
  };

  return Storage;
};
