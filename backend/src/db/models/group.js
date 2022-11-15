export default (sequelize, DataTypes) => {
  const Group = sequelize.define('group', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Group.associate = (models) => {
    Group.hasMany(models.User, { foreignKey: 'group_id' });
  };

  return Group;
};
