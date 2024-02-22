/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class VoteOption extends Model {
            static associate(models) {
                  // define association here
            }
      }
      VoteOption.init(
            {
                  idVote: DataTypes.NUMBER,
                  optionName: DataTypes.STRING,
                  creatorUserId: DataTypes.NUMBER,
            },
            {
                  sequelize,
                  modelName: "VoteOption",
            },
      );
      return VoteOption;
};
