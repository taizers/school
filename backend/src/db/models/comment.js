export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: 'creator_id', as: 'user' });
  };

  return Comment;
};
