/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Vote extends Model {
            static associate(models) {
                  // define association here
            }
      }
      Vote.init(
            {
                  title: DataTypes.STRING,
                  creatorUserId: DataTypes.NUMBER,
                  chatId: DataTypes.NUMBER,
                  endDate: DataTypes.DATE,
                  isClose: DataTypes.NUMBER,
            },
            {
                  sequelize,
                  modelName: "Vote",
            },
      );
      return Vote;
};
