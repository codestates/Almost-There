'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users_groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupId: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      overtime: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users_groups');
  }
};
