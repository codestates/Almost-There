'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('users', {
      fields: ['userId'],
      type: 'unique',
      name: 'users_userId_unique'
    });

    await queryInterface.addConstraint('users_groups', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'group_member_user_id_fk',
      references: {
        table: 'users',
        field: 'userId'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('notifications_users', {
      fields: ['from'],
      type: 'foreign key',
      name: 'notification_from_user_id_fk',
      references: {
        table: 'users',
        field: 'userId'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('notifications_users', {
      fields: ['to'],
      type: 'foreign key',
      name: 'notification_to_user_id_fk',
      references: {
        table: 'users',
        field: 'userId'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('notifications_users', {
      fields: ['notifyId'],
      type: 'foreign key',
      name: 'notification_id_fk',
      references: {
        table: 'notifications',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('users_groups', {
      fields: ['groupId'],
      type: 'foreign key',
      name: 'group_id_fk',
      references: {
        table: '_groups',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
