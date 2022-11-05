export default (sequelize, DataTypes) => {
  const Page = sequelize.define('page', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Page.associate = (models) => {
    Page.belongsTo(models.User, { foreignKey: 'creator_id', as: 'user' });
    Page.hasMany(models.Page, { foreignKey: 'mainpage_id', as: 'subpages' });
  };

  return Page;
};
