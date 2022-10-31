module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'comment',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { onDelete: 'cascade', foreignKey: "creator_id", });
  };

  return Comment;
};
