module.exports = (sequelize, DataTypes) => {
  const Storagegroup = sequelize.define(
    'storagegroup',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
  );

  Storagegroup.associate = (models) => {
    Storagegroup.hasMany(models.Storage, { onDelete: 'cascade' });
  };

  return Storagegroup;
};
