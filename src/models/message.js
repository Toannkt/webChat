/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Message extends Model {
            static associate(models) {
                  // define association here
            }
      }
      Message.init(
            {
                  content: DataTypes.TEXT,
                  sentAt: DataTypes.DATE,
                  seenAt: DataTypes.DATE,
                  idUserSender: DataTypes.NUMBER,
                  idUserReceiver: DataTypes.NUMBER,
                  chatId: DataTypes.NUMBER,
            },
            {
                  sequelize,
                  modelName: "Message",
            },
      );
      return Message;
};
