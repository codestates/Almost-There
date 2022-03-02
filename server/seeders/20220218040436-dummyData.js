'use strict';
const createdAt = new Date();
const updatedAt = new Date();
const crypto = require('crypto');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // let user1 = await queryInterface.bulkInsert('users', [{
    //   userId:'kimcoding@codestates.com',
    //   name:'김코딩',
    //   password:'1234',
    //   email:'kimcoding@codestates.com',
    //   social:'AT',
    //   createdAt: new Date(Date.now()),
    //   updatedAt: new Date(Date.now())
    // }], {})

    //       let group1 = await queryInterface.bulkInsert('_groups',[{
    //   name:'김코딩 모임',
    //   time:new Date(Date.now()),
    //   leaderId:"kimcoding@codestates.com",
    //   createdAt: new Date(Date.now()),
    //   updatedAt: new Date(Date.now()),
    //   place: '강남역',
    //   y:'37.49753208360963',
    //   x:'127.0267786409362'
    // }])

    // let group2 = await queryInterface.bulkInsert('_groups',[{
    //   name:'박해커 모임',
    //   time:new Date(Date.now()),
    //   leaderId:"parkhacker@codestates.com",
    //   createdAt: new Date(Date.now()),
    //   updatedAt: new Date(Date.now()),
    //   place:'양재역 9번출구',
    //   y: '37.48276303605517',
    //   x: '127.03557641134296'

    // }])

    // let group3 = await queryInterface.bulkInsert('_groups',[{
    //   name:'전상인 모임',
    //   time:new Date(Date.now()),
    //   leaderId:"tkdls1611@naver.com",
    //   createdAt: new Date(Date.now()),
    //   updatedAt: new Date(Date.now()),
    //   place: '코엑스',
    //   y: '37.51183045067563',
    //   x: '127.05914383375931'
    // }])

    await queryInterface.bulkInsert(
      '_groups',
      [
        {
          name: 'tester1',
          time: 20220228180000,
          leaderId: 'kimcoding',
          place: '압구정역',
          x: '0',
          y: '0',
          createdAt,
          updatedAt
        },
        {
          name: 'tester2',
          time: 20220315201400,
          leaderId: 'kimcoding',
          place: '강남역',
          x: '0',
          y: '0',
          createdAt,
          updatedAt
        },
        {
          name: '전상인 모임',
          time: new Date(Date.now()),
          leaderId: 'kimcoding',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          place: '코엑스',
          y: '37.51183045067563',
          x: '127.05914383375931'
        }

      ],
      {}
    );
    await queryInterface.bulkInsert(
      'users',
      [
        {
          userId: 'kimcoding',
          name: '김코딩',
          password: crypto.createHash('sha512').update('1234').digest('hex'),
          email: 'kimcoding@codestates.com',
          social: 'AT',
          x: '126.97786153588709',
          y: '37.56683297166782',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now())
        },
        {
          userId: 'parkhacker@codestates.com',
          name: '박해커',
          password: crypto.createHash('sha512').update('1234').digest('hex'),
          email: 'parkhacker@codestates.com',
          social: 'AT',
          x: '0',
          y: '0',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now())
        },
        {
          userId: 'test',
          name: 'test',
          password: crypto.createHash('sha512').update('1234').digest('hex'),
          email: 'test@test.com',
          social: 'AT',
          x: '0',
          y: '0',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now())
        }

      ],
      {}
    );
    await queryInterface.bulkInsert(
      'users_groups',
      [
        {
          userId: 'kimcoding',
          groupId: 1,
          overtime: '00:00:00',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now())

        },
        {
          userId: 'kimcoding',
          groupId: 2,
          overtime: '00:00:00',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now())

        },
        {
          userId: 'kimcoding',
          groupId: 3,
          overtime: '00:00:00',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now())
        },
        {
          userId: 'parkhacker@codestates.com',
          groupId: 1,
          overtime: '00:00:00',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now())

        },
        {
          userId: 'parkhacker@codestates.com',
          groupId: 3,
          overtime: '00:00:00',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now())
        },
        {
          userId: 'test',
          groupId: 1,
          overtime: '00:00:00',
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now())
        }

      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('_groups', null, {});
    await queryInterface.bulkDelete('users_groups', null, {});
  }
};

// let user1 = await queryInterface.bulkInsert('users', [{
//   userId:'kimcoding@codestates.com',
//   name:'김코딩',
//   password:'1234',
//   email:'kimcoding@codestates.com',
//   social:'AT',
//   createdAt: new Date(Date.now()),
//   updatedAt: new Date(Date.now())
// }], {})
// let user2 = await queryInterface.bulkInsert('users', [{
//   userId:'parkhacker@codestates.com',
//   name:'박해커',
//   password:'1234',
//   email:'parkhacker@codestates.com',
//   social:'AT',
//   createdAt: new Date(Date.now()),
//   updatedAt: new Date(Date.now())
// }], {})
// let user3 = await queryInterface.bulkInsert('users', [{
//   userId:'tkdls1611@naver.com',
//   name:'전상인',
//   password:'1234',
//   email:'tkddls1611@naver.com',
//   social:'AT',
//   createdAt: new Date(Date.now()),
//   updatedAt: new Date(Date.now())
// }], {})

// let user4 = await queryInterface.bulkInsert('users', [{
//   userId:'GD@naver.com',
//   name:'GD',
//   password:'1234',
//   email:'GD@naver.com',
//   social:'AT',
//   createdAt: new Date(Date.now()),
//   updatedAt: new Date(Date.now())
// }], {})

// let user5 = await queryInterface.bulkInsert('users', [{
//   userId:'TOP@naver.com',
//   name:'TOP',
//   password:'1234',
//   email:'TOP@naver.com',
//   social:'AT',
//   createdAt: new Date(Date.now()),
//   updatedAt: new Date(Date.now())
// }], {})

// let group1 = await queryInterface.bulkInsert('_groups',[{
//   name:'김코딩 모임',
//   time:new Date(Date.now()),
//   leaderId:"kimcoding@codestates.com",
//   createdAt: new Date(Date.now()),
//   updatedAt: new Date(Date.now())
// }])

// let group2 = await queryInterface.bulkInsert('_groups',[{
//   name:'박해커 모임',
//   time:new Date(Date.now()),
//   leaderId:"parkhacker@codestates.com",
//   createdAt: new Date(Date.now()),
//   updatedAt: new Date(Date.now())
// }])

// let group3 = await queryInterface.bulkInsert('_groups',[{
//   name:'전상인 모임',
//   time:new Date(Date.now()),
//   leaderId:"tkdls1611@naver.com",
//   createdAt: new Date(Date.now()),
//   updatedAt: new Date(Date.now())
// }])

// let users_groups1 = await queryInterface.bulkInsert('users_groups',[{
//   userId:user1,
//   groupId:group1,
//   createdAt: new Date(Date.now()),
//   updatedAt: new Date(Date.now())
// }])

// let users_groups2 = await queryInterface.bulkInsert('users_groups',[{
//   userId: user2,
//   groupId:group2,
//   createdAt: new Date(Date.now()),
//   updatedAt: new Date(Date.now())
// }])

// let users_groups3 = await queryInterface.bulkInsert('users_groups',[{
//   userId: user3,
//   groupId:group3,
//   createdAt: new Date(Date.now()),
//   updatedAt: new Date(Date.now())
// }])

//     /**
//      * Add seed commands here.
//  *
//  * Example:
//  * await queryInterface.bulkInsert('People', [{
//  *   name: 'John Doe',
//  *   isBetaMember: false
//  * }], {});
//     */
//   // },

//   async down (queryInterface, Sequelize) {
//     await queryInterface.bulkDelete('users', null, {})
//     await queryInterface.bulkDelete('_groups', null, {})
//     await queryInterface.bulkDelete('users_groups', null, {})
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// // };
