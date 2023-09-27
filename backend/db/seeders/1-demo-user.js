'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: 'Min',
        lastName: 'Kim',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Gym-Trainer',
        lastName: 'Roxanne',
        email: 'user1@user.io',
        username: 'Roxanne',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Trainer',
        lastName: 'Monk',
        email: 'user2@user.io',
        username: 'Monk',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Gym-Trainer',
        lastName: 'Erika',
        email: 'user3@user.io',
        username: 'Erika',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Elite',
        lastName: 'Four',
        email: 'user4@user.io',
        username: 'EliteFour',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Vengeful',
        lastName: 'Spirit',
        email: 'user5@user.io',
        username: 'marowak',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Professor',
        lastName: 'Rowan',
        email: 'user6@user.io',
        username: 'Rowan',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Queasy',
        lastName: 'Captain',
        email: 'user7@user.io',
        username: 'givemecut',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
