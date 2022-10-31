module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      family: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
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
      },
    }
  );

  User.associate = (models) => {
    User.hasOne(models.Token, { onDelete: 'cascade' });
    User.belongsTo(models.Group, { onDelete: 'cascade', foreignKey: "group_id" });
    User.hasMany(models.Galery, { onDelete: 'cascade' });
    User.hasMany(models.Comment, { onDelete: 'cascade' });
    User.hasMany(models.News, { onDelete: 'cascade' });
    User.hasMany(models.Storage, { onDelete: 'cascade' });
    User.hasMany(models.Page, { onDelete: 'cascade' });
  };

  return User;
};
