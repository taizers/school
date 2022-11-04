export default (sequelize, DataTypes) => {
  const Group = sequelize.define(
    'group',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    }
  );

  Group.associate = (models) => {
    Group.hasMany(models.User, { foreignKey: "group_id", as: 'users' });
  };

  return Group;
};
