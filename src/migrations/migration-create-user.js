/** @format */

"use strict";

const sequelize = require("sequelize");

module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("Users", {
                  id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  userName: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  email: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  password: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  roleId: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  avatarUrl: {
                        type: Sequelize.STRING,
                        allowNull: true,
                  },
                  firstName: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  lastName: {
                        type: Sequelize.STRING,
                        allowNull: false,
                  },
                  onlineStatus: {
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
            await queryInterface.dropTable("Users");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
