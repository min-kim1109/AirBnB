'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: 'Decent',
        stars: 5
      },
      {
        spotId: 2,
        userId: 1,
        review: 'Great stay',
        stars: 4
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Horrible',
        stars: 3
      },
      {
        spotId: 4,
        userId: 3,
        review: 'Horrible',
        stars: 5
      },
      {
        spotId: 5,
        userId: 4,
        review: 'Horrible',
        stars: 4
      },
      {
        spotId: 6,
        userId: 5,
        review: 'Horrible',
        stars: 1
      },
      {
        spotId: 7,
        userId: 6,
        review: 'Horrible',
        stars: 4
      },

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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {})

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
