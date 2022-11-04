export default (sequelize, DataTypes) => {
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
    Storage.belongsTo(models.Storagegroup, { foreignKey: "group_id", });
    Storage.belongsTo(models.User, { foreignKey: "creator_id", });
  };

  return Storage;
};
