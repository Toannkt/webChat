/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Conversations extends Model {
            static associate(models) {
                  // define association here
            }
      }
      Conversations.init(
            {
                  chatName: DataTypes.STRING,
                  type: DataTypes.STRING,
                  isPin: DataTypes.NUMBER,
                  pinCode: DataTypes.STRING,
                  idGroup: DataTypes.NUMBER,
            },
            {
                  sequelize,
                  modelName: "Conversations",
            },
      );
      return Conversations;
};
