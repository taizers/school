module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define(
    'page',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }
  );

  Page.associate = (models) => {
    Page.belongsTo(models.User, { onDelete: 'cascade', foreignKey: "creator_id", });
    Page.belongsToMany(models.Page, { onDelete: 'cascade', as: 'subpage', through: 'subpages' });
  };

  return Page;
};
