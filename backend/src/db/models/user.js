export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    email: {
      allowNull: true,
      defaultValue: null,
      unique: true,
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    post: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
    },
    activationkey: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  User.associate = (models) => {
    User.hasOne(models.Token, { onDelete: 'cascade', foreignKey: 'owner_id' });
    User.belongsTo(models.Group, { foreignKey: 'group_id', as: 'users' });
    User.hasMany(models.Galery, { foreignKey: 'creator_id' });
    User.hasMany(models.Comment, { foreignKey: 'creator_id' });
    User.hasMany(models.News, { foreignKey: 'creator_id' });
    User.hasMany(models.Storage, { foreignKey: 'creator_id' });
    User.hasMany(models.Page, { foreignKey: 'creator_id', as: 'user' });
  };

  return User;
};
