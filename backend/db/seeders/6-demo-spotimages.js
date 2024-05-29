'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://i.imgur.com/XALBszG.png',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://i.imgur.com/qzSBF9Y.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.imgur.com/IOPs1Dg.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.imgur.com/IOPs1Dg.png',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.imgur.com/VF7hSlF.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/PYaCrgU.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/nZDDfS6.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/5JuKd6D.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/KzcyTdZ.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/RuJYiNw.png',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.imgur.com/CMoDl1r.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://i.imgur.com/JM0Pjfv.png',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.imgur.com/eNpwL15.png',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158366898124242964/3_-_pic2.png?ex=651bfcbd&is=651aab3d&hm=69f17c2e7231ce357aa531f42963051c824e6e8e01148d2ddc757dbaf119f150&',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.imgur.com/vm4WEWj.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.imgur.com/TZJ3OOA.png',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://i.imgur.com/qV2Ay2G.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.imgur.com/Hy0caYU.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.imgur.com/QJWutff.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.imgur.com/vGrFSPD.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.imgur.com/Lophv5X.png',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://i.imgur.com/2pMwpGh.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.imgur.com/Qqgr1n2.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.imgur.com/75jtsTX.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.imgur.com/3Dt60b4.png',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/ypS0IWR.png',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/FrDK7qD.png',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/buYm7Fm.png',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/Y1z1dvD.png',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/PU9rrCZ.png',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.imgur.com/D0hPeJQ.png',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://i.imgur.com/dRA5qag.png',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158371231742033920/7_-_2.png?ex=651c00c7&is=651aaf47&hm=1bb61160ab63460ec079ec24ce694b9c6a9994673ef7b2f5b42d3324e9ace93c&',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158371232006279258/7_-_3.png?ex=651c00c7&is=651aaf47&hm=5834bf5eef6b827dbcda37dfeb0ed5249227acb712dba09c72fc0296b1aac556&',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158371231054168156/7_-_4.png?ex=651c00c6&is=651aaf46&hm=5d8c95b5bde2137f35cdb372ab99e466997fb1cceb48c3c6ac1280a2db77c01c&',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1156579980860461098/8_-_SSANNE.png?ex=65157c8b&is=65142b0b&hm=b8cbe1aa3652d60386f2810cf96d3901fd4ab387746c03e80fb38e6a3b61de11&',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158371946510168134/8_-_4.png?ex=651c0171&is=651aaff1&hm=291ec052047e90ec30c6daa7b271ac8a2d4b8ebc0faaf615ebe3b9d4f48c15e1&',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158371946837315604/8_-_1.png?ex=651c0171&is=651aaff1&hm=abb81189297edd03dc8ea332557fc4cdbd7d99fb8dfc4b424a129f4637514ef1&',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158371947449692290/8_-_3.png?ex=651c0171&is=651aaff1&hm=bae82340445e058902b71ac9c610c4ef7091c6315e2c358a4e7fa7218cf43a89&',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158371947168677908/8_-_2.png?ex=651c0171&is=651aaff1&hm=0991cae0970b4eb3995e0e7cff90b4e0053fad137d674b7394becb9bda087297&',
        preview: false
      }
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
