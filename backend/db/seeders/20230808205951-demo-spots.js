'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 3,
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
        ownerId: 3,
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
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      name: { [Op.in]: ['Cloverfield Lane Experience', 'Parker Residence', 'P. Sherman Residence'] }
    }, {});
  }
};
