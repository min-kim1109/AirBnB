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
        url: 'https://i.imgur.com/GqnNUrR.png',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.imgur.com/xJMGl8X.png',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://i.imgur.com/pLzTxie.png',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.imgur.com/zeJOP4J.png',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://i.imgur.com/30DWVlh.png',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.imgur.com/SULqH4A.png',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.imgur.com/v84TUru.png',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.imgur.com/GdMLWI5.png',
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
