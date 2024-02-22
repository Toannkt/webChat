/** @format */

"use strict";

const sequelize = require("sequelize");

module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("BlackLists", {
                  id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  ownerUserId: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  blockedUserId: {
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
            await queryInterface.dropTable("BlackLists");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
