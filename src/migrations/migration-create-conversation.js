/** @format */

"use strict";

const sequelize = require("sequelize");
//type: private or group
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("Conversations", {
                  id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  chatName: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  type: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  isPin: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                  },
                  pinCode: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  idGroup: {
                        type: Sequelize.INTEGER,
                        allowNull: true,
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
            await queryInterface.dropTable("Conversations");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
