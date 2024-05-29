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
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1156556596596457522/3_-_Sprout_Tower.png?ex=651566c4&is=65141544&hm=0d1d0bfaf9bfc0de30bf08865b905dd4c6a6e7f79ee0834a499c5ef1f2a1ea94&',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158366868684419142/3_-_monks.png?ex=651bfcb6&is=651aab36&hm=050811004acb86f2b265ddcda6566c584e0ffd9fb18f187752c2745ccfeae223&',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158366887365853265/3_-_pic.png?ex=651bfcbb&is=651aab3b&hm=441e24b5c3d80aee6740d304c14e00911737bfcbc7c2973ee088dce746806d29&',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158366898124242964/3_-_pic2.png?ex=651bfcbd&is=651aab3d&hm=69f17c2e7231ce357aa531f42963051c824e6e8e01148d2ddc757dbaf119f150&',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158366904986120253/3_-_top.png?ex=651bfcbf&is=651aab3f&hm=22aa65cde3b4ca28582000acb0c2e7a8db268033ec03672de8ba857bf0fd998e&',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1156557773694324786/4_-_Celadon_City.png?ex=651567dd&is=6514165d&hm=bc3423ee067fb0eedcf455bb775e3653177b53d33c32c86b0441784507b7d5ee&',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158367795424268308/4_-_casino.png?ex=651bfd93&is=651aac13&hm=0b1bc7480b085800dff862d79f9f47431bdc9b2e8824674720c2f0908ae0f68e&',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158367797735346219/4_-_eevee.png?ex=651bfd94&is=651aac14&hm=9a7ab4c56d8f3eb88dbd4a77dd55bbdae58d0a7d4aa0a6942198cd1870bd3741&',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158367804672708688/4_-_erika.png?ex=651bfd96&is=651aac16&hm=ade40f1387865b4d4cbce4ce7de2ae3c388924f54f36b06f79802da6505c5e4d&',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158367811136135199/4_-_market.png?ex=651bfd97&is=651aac17&hm=3fba749c0d880d5cbfa96726132c9cf7839475c8eec640b2c0a631759f219ce0&',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1156560485341204531/5_-_Ever_Grande_City.png?ex=65156a63&is=651418e3&hm=c5f2d014d4d85a2d7035d300629c62e6ee54c3df8312cfbf46bfca88d3447502&',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158369191754207232/5_-_1.png?ex=651bfee0&is=651aad60&hm=11358ee9e64e7abf53943da7871d16e3d6e50802b9c8129bd7eef8164d08cd30&',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158369192450474074/5_-_2.png?ex=651bfee0&is=651aad60&hm=0ede8771bd5980cf2676367494a86dc17e2d093b3e5ba7ef2f126f60f9ff3417&',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158369192748265532/5_-_3.png?ex=651bfee1&is=651aad61&hm=ae85da09f814358807445ca1c6e2c66cfb7a9c4d7840318e4cec294e35339213&',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158369191397699684/5_-_4.png?ex=651bfee0&is=651aad60&hm=2b2d00032169e7ec071272843f07c3e6de090f0c2b2d3ae6874fa1074e323d3b&',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1156569399969460264/6_-_Lavender_Town.png?ex=651572b0&is=65142130&hm=3c5d00d6b1dfa2915355ecc6dd52c1ed892a67afedadaf68668b2cd097d3b23e&',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158370242540601445/6_-_1.png?ex=651bffdb&is=651aae5b&hm=9466ebd3b3d94fb978fcb680cb80fc55fd1079cd50638e0d2088cc8e1eb72265&',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158370242758721556/6_-_2.png?ex=651bffdb&is=651aae5b&hm=4304ecf77521665eb65a0af962e108fe8642e9398e1a7c6c174b21e7ae6054b9&',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158370243035541564/6_-_3.png?ex=651bffdb&is=651aae5b&hm=2f863d6a2ecd0631c047112b51b3e9b7c38d506099c99924ecf865014e359f2c&',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158370242318315631/6_-_4.png?ex=651bffdb&is=651aae5b&hm=8a123192105c1c3fb968b004950051ab27b0adba1ea8115f81d36c64be84308a&',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1156573262424318003/7_-_Twinleaf_Town.png?ex=65157649&is=651424c9&hm=c72aece953de553fe288496236f99bec03b8d0ff14d25bd9d85d2725ba35b83b&',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1158371231381336114/7_-_1.png?ex=651c00c7&is=651aaf47&hm=c95e8e87beb573adc84cb834cbc7b32d48fd99b4731140fa3da6180180e1010a&',
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
