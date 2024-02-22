/** @format */

"use strict";

const sequelize = require("sequelize");

module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("voteOptions", {
                  id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  idVote: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  optionName: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  creatorUserId: {
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
            await queryInterface.dropTable("voteOptions");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
