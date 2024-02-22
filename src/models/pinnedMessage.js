/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class PinnedMessage extends Model {
            static associate(models) {
                  // define association here
            }
      }
      PinnedMessage.init(
            {
                  messageId: DataTypes.NUMBER,
                  pinnedUserId: DataTypes.NUMBER,
                  isPin: DataTypes.NUMBER,
            },
            {
                  sequelize,
                  modelName: "PinnedMessage",
            },
      );
      return PinnedMessage;
};
