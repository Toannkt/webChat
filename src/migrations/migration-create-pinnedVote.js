/** @format */

"use strict";

const sequelize = require("sequelize");

module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("PinnedVotes", {
                  id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  voteId: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  pinnedUserId: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  isPin: {
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
            await queryInterface.dropTable("PinnedVotes");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
