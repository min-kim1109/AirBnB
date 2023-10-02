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
        city: 'Pallet Town',
        state: 'Kanto',
        country: 'Pokemon LeafGreen/FireRed',
        lat: 29.9769,
        lng: -90.4106,
        name: 'Pallet Town',
        description: 'A nostalgic start to anyone with a childhood. Get started on your Pokemon Adventure today by visiting Professor Oak and his select choice of 3 starter pokemon!',
        price: 50.00
      },
      {
        ownerId: 2,
        address: '36 Fuller Pl',
        city: 'Rustboro City',
        state: 'Hoenn',
        country: 'Pokemon Ruby/Sapphire/Emerald',
        lat: 40.6584,
        lng: -73.9802,
        name: 'Rustboro City',
        description: 'A metropolis located in western Hoenn. Fourth-largest city in Hoenn. The building architecture are designed with stone, giving it an old-town feeling. Visit gym-leader Roxanne and her team of Rock typed pokemon to get started on your first challenge as a Pokemon master!',
        price: 150.00
      },
      {
        ownerId: 3,
        address: '42 Wallaby Way, Sydney',
        city: 'Sprout Tower',
        state: 'Johto',
        country: 'Pokemon HeartGold/SoulSilver',
        lat: -33.6740,
        lng: 151.2858,
        name: 'Sprout Tower',
        description: 'Large pagoda located in Violet City in the Johto Region. The tower itself is over 100 feet tall and is held together by a giant flexible pillar that shakes from side to side. This flexibility protects the tall tower from earthquakes and symbolizes the battles that are occuring on upper floors. Legend has it that a 100-foot-tall Bellsprout was used to make the swaying pillar.',
        price: 60.00
      },
      {
        ownerId: 4,
        address: '42 Wallaby Way, Sydney',
        city: 'Celadon City',
        state: 'Kanto',
        country: 'Pokemon LeafGreen/FireRed',
        lat: -33.6740,
        lng: 151.2858,
        name: 'Celadon Town',
        description: 'Celadon City is located in central Kanto. It is the most populous city in Kanto. The city has two entrances, one from the east via Route 7, and one from the west via Route 16. Celadon is the main place to spend money in Kanto, through the Celadon Department Store and the Celadon Game corner where you gamble your life earnings away. Celadon is also home to Erika, the city\'s gym leader.',
        price: 300.00
      },
      {
        ownerId: 5,
        address: '42 Wallaby Way, Sydney',
        city: 'Ever Grande City',
        state: 'Hoenn',
        country: 'Pokemon Ruby/Sapphire/Emerald',
        lat: -33.6740,
        lng: 151.2858,
        name: 'Ever Grande City',
        description: 'City located on an island in eastern Hoenn. Location of the Hoenn Pokemon League. Must traverse through Victory road and it\'s hoard of trainers to be enter and challenge the Elite Four. The Elite Four comprises of the apex of Pokemon Trainers in the Hoenn Region. Defeat them all to have a chance at fighting the Champion for his acclaimed title.',
        price: 1000.00
      },
      {
        ownerId: 6,
        address: '42 Wallaby Way, Sydney',
        city: 'Lavender Town',
        state: 'Kanto',
        country: 'Pokemon LeafGreen/FireRed',
        lat: -33.6740,
        lng: 151.2858,
        name: 'Lavender Town',
        description: 'Small town located in northeast Kanto, just south of the Rock Tunnel. Citizens of Lavender Town claim Lavender Town is known mainly for ghost sightings in the Pokemomn Tower and as the main gravesite of Pokemon. Citizens claim the ghosts that appear int he tower are the spirits of Pokemon that have died.',
        price: 125.00
      },
      {
        ownerId: 1,
        address: '42 Wallaby Way, Sydney',
        city: 'Twinleaf Town',
        state: 'Sinnoh',
        country: 'Pokemon Diamond/Pearl/Platinum',
        lat: -33.6740,
        lng: 151.2858,
        name: 'Twinleaf Town',
        description: 'Twinleaf Town is situated in the southwestern part of the Sinnoh Region. It is the nearest town to Lake Verity, referred to by residents as their local lake. It is a small town with the fresh scent of new leaves in the air. It feels like a place where adventures start. Your own home and your best friend\'s house are located here.',
        price: 35.00
      },
      {
        ownerId: 8,
        address: '42 Wallaby Way, Sydney',
        city: 'Vermillion City',
        state: 'Kanto',
        country: 'Pokemon Diamond/Pearl/Platinum',
        lat: -33.6740,
        lng: 151.2858,
        name: 'S.S. Anne Cruise',
        description: 'The S.S. Anne is a well-known luxury cruise liner which sails the world, stopping annually in Vermillion City.',
        price: 750.00
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
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
