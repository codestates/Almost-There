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



    /*
    * UNIQUE
    queryInterface.addConstraint('Users', {
      fields: ['email'],
      type: 'unique',
      name: 'custom_unique_constraint_name'
    });
    */

    /*
    * Foreign Key
    queryInterface.addConstraint('Posts', {
    fields: ['username'],
    type: 'foreign key',
    name: 'custom_fkey_constraint_name',
    references: { //Required field
      table: 'target_table_name',
      field: 'target_column_name'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
    });
    */
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



/*
* Composite Foreign Key
queryInterface.addConstraint('TableName', {
  fields: ['source_column_name', 'other_source_column_name'],
  type: 'foreign key',
  name: 'custom_fkey_constraint_name',
  references: { //Required field
    table: 'target_table_name',
    fields: ['target_column_name', 'other_target_column_name']
  },
  onDelete: 'cascade',
  onUpdate: 'cascade'
});
*/

// !DB Schema 수정
// users_groups 테이블에 groupId 타입을 varchar -> integer로 변경

/*
에러: 테이블 관계를 설정하는 방법 찾는 중(model 매핑 말고)
에러: foreign key를 설정할 수 없는 문제

에러 메시지
Loaded configuration file "config/config.js".
Using environment "development".
== 20220217062950-fk-comment: migrating =======

ERROR: Failed to add the foreign key constraint. Missing index for constraint 'user_id_fk' in the referenced table 'users_groups'

해결방법: 참조하고자 하는 값의 타입을 Unique로 지정
연결되는 두 값의 데이터 타입을 동일하게 변경

async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('users', {
      fields: ['userId'],
      type: 'unique',
      name: 'users_userId_unique'
    });

    await queryInterface.addConstraint('users_groups', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'user_id_fk',
      references: {
        table: 'users',
        field: 'userId'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
},

출처: https://yusang.tistory.com/104 [YS's develop story]

참고: https://loy124.tistory.com/374
참고: https://yusang.tistory.com/104
*/