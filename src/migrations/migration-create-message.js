/** @format */

"use strict";

const sequelize = require("sequelize");

module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("Messages", {
                  id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  content: {
                        type: Sequelize.TEXT,
                        allowNull: false,
                  },
                  sentAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                  },
                  seenAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                  },
                  idUserSender: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  idUserReceiver: {
                        type: Sequelize.INTEGER,
                        allowNull: true,
                  },
                  chatId: {
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
            await queryInterface.dropTable("Messages");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
