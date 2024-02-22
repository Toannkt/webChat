/** @format */

"use strict";

const sequelize = require("sequelize");

module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("Votes", {
                  id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  title: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  creatorUserId: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  chatId: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  endDate: {
                        type: Sequelize.DATE,
                        allowNull: true,
                  },
                  isClose: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  createdAt: {
                        allowNull: false,
                        type: Sequelize.DATE,
                  },
                  updatedAt: {
                        allowNull: false,
                        type: Sequelize.DATE,
                  },
            });
      },
      down: async (queryInterface, Sequelize) => {
            await queryInterface.dropTable("Votes");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
