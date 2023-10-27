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
        userId: 2,
        review: 'Decent stay',
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Loved my time here!',
        stars: 4
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Professor Oak was a little overbearing',
        stars: 2
      },
      {
        spotId: 1,
        userId: 4,
        review: 'Someone took the starter I wanted!',
        stars: 3
      },
      {
        spotId: 1,
        userId: 6,
        review: 'Ash\'s mom was super welcoming, would book again',
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Roxanne was a tough battle.',
        stars: 4
      },
      {
        spotId: 2,
        userId: 5,
        review: 'Dev Corp architecture is awesome, definitely check it out',
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Monks made the stay a little awkward',
        stars: 3
      },
      {
        spotId: 3,
        userId: 7,
        review: 'No AC, was cold at night...',
        stars: 1
      },
      {
        spotId: 4,
        userId: 3,
        review: 'Great, won it big at the gambling corner!',
        stars: 5
      },
      {
        spotId: 4,
        userId: 2,
        review: 'I lost all my money.',
        stars: 1
      },
      {
        spotId: 5,
        userId: 4,
        review: 'Beat the Elite 4 and then lost to the champion, will try again next time.',
        stars: 4
      },
      {
        spotId: 6,
        userId: 5,
        review: 'Horrible, think my room was haunted',
        stars: 1
      },
      {
        spotId: 7,
        userId: 6,
        review: 'Had a good time!',
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
