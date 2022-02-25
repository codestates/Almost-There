'use strict';
const createdAt = new Date();
const updatedAt = new Date();


module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert(
        '_Groups',
        [
          {
            name: 'tester1',
            time:  20220228180000,
            leaderId: 'leader1',
            place: '압구정역',
            createdAt ,
            updatedAt,
          },
          {
            name: 'tester2',
            time:  20220315201400,
            leaderId: 'leader2',
            place: '강남역',
            createdAt ,
            updatedAt,
          },
        ],
        {}
      );
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('_Groups', null, {});
    },
  };


// 'use strict';

// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };
