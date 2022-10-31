module.exports = (sequelize, DataTypes) => {
  const Storage = sequelize.define(
    'storage',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
  );

  Storage.associate = (models) => {
    Storage.belongsTo(models.Storagegroup, { onDelete: 'cascade', foreignKey: "group_id", });
    Storage.belongsTo(models.User, { onDelete: 'cascade', foreignKey: "creator_id", });
  };

  return Storage;
};
