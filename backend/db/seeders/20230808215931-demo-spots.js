'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '10 Cloverfield Lane',
        city: 'Hahnville',
        state: 'Louisiana',
        country: 'United States of America',
        lat: 29.9769,
        lng: -90.4106,
        name: 'Cloverfild Lane Experience',
        description: 'A stay that will chill you to your very core',
        price: 450.00
      },
      {
        ownerId: 2,
        address: '36 Fuller Pl',
        city: 'Brooklyn',
        state: 'New York',
        country: 'United States of America',
        lat: 40.6584,
        lng: -73.9802,
        name: 'Parker Residence',
        description: 'Home to your very own neighborhood superhero!',
        price: 120.00
      },
      {
        ownerId: 3,
        address: '42 Wallaby Way, Sydney',
        city: 'Sydney',
        state: 'N/A',
        country: 'Australia',
        lat: -33.6740,
        lng: 151.2858,
        name: 'P. Sherman Residence',
        description: 'Nemo, where are you??',
        price: 60.00
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
