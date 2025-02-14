'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('customer', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING(150),
          allowNull: false
        },
        email: {
            type: Sequelize.STRING(150),
            allowNull: false,
            unique: true,         
        },
        phone: {
            type: Sequelize.STRING(11),
            allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('customer');
  }
};
