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
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1156550741033492562/1_-_PalletTown.png?ex=65156150&is=65140fd0&hm=9e5f3182dc425d87608476be1857710290444b6cb35acb9529ba88aa82376cea&',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1156555008276430908/2_-_Rustboro_City.png?ex=65156549&is=651413c9&hm=479f10fc7dc16c8b0f3aef2c8f424b2aa3fa8fb81bfd14c161deff9b4debe50a&',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1156556596596457522/3_-_Sprout_Tower.png?ex=651566c4&is=65141544&hm=0d1d0bfaf9bfc0de30bf08865b905dd4c6a6e7f79ee0834a499c5ef1f2a1ea94&',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1156557773694324786/4_-_Celadon_City.png?ex=651567dd&is=6514165d&hm=bc3423ee067fb0eedcf455bb775e3653177b53d33c32c86b0441784507b7d5ee&',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1156560485341204531/5_-_Ever_Grande_City.png?ex=65156a63&is=651418e3&hm=c5f2d014d4d85a2d7035d300629c62e6ee54c3df8312cfbf46bfca88d3447502&',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1156569399969460264/6_-_Lavender_Town.png?ex=651572b0&is=65142130&hm=3c5d00d6b1dfa2915355ecc6dd52c1ed892a67afedadaf68668b2cd097d3b23e&',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1156573262424318003/7_-_Twinleaf_Town.png?ex=65157649&is=651424c9&hm=c72aece953de553fe288496236f99bec03b8d0ff14d25bd9d85d2725ba35b83b&',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://cdn.discordapp.com/attachments/513986476783173643/1156579980860461098/8_-_SSANNE.png?ex=65157c8b&is=65142b0b&hm=b8cbe1aa3652d60386f2810cf96d3901fd4ab387746c03e80fb38e6a3b61de11&',
        preview: true
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
