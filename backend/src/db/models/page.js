export default (sequelize, DataTypes) => {
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
    Page.belongsTo(models.User, {  foreignKey: "creator_id", });
    Page.belongsToMany(models.Page, {  as: 'subpage', through: 'subpages' });
  };

  return Page;
};
