/** @format */

"use strict";

const sequelize = require("sequelize");

module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("GroupInvitations", {
                  id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  inviterUserId: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  inviteeUserId: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  groupId: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  statusInvition: {
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
            await queryInterface.dropTable("GroupInvitations");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
