/** @format */

"use strict";

const sequelize = require("sequelize");

module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("GroupMembers", {
                  id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  idUser: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  idGroupConversation: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  role: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  type: {
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
            await queryInterface.dropTable("GroupMembers");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
