/** @format */

"use strict";

const sequelize = require("sequelize");

module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("Groups", {
                  id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  groupName: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  desc: {
                        type: Sequelize.STRING,
                        allowNull: true,
                  },
                  creatorUserId: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  typeGroup: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  isReviewMember: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  isAllowMultipleOptions: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  isAllowAddingOptions: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  isHideResultsBeforeVoting: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  isHideOthersAnswers: {
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
            await queryInterface.dropTable("Groups");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
