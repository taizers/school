/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      group_id: {
        allowNull: true,
        references: {
          model: 'groups',
          key: 'id',
        },
        type: Sequelize.DataTypes.INTEGER,
      },
      username: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.STRING,
      },
      email: {
        allowNull: true,
        defaultValue: null,
        unique: true,
        type: Sequelize.DataTypes.STRING,
      },
      phone: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.STRING,
      },
      avatar: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      post: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      role: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
      activationkey: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('users');
  },
};
