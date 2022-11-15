/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('storages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      type: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      title: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      size: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      storagegroup_id: {
        allowNull: false,
        references: {
          model: 'storagegroups',
          key: 'id',
        },
        type: Sequelize.DataTypes.INTEGER,
      },
      creator_id: {
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        type: Sequelize.DataTypes.INTEGER,
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
    return queryInterface.dropTable('storages');
  },
};
