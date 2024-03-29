export default (sequelize, DataTypes) => {
  const News = sequelize.define('news', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  News.associate = (models) => {
    News.belongsTo(models.User, { foreignKey: 'creator_id', as: 'user' });
  };

  return News;
};
