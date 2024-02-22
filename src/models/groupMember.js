/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class GroupMember extends Model {
            static associate(models) {
                  // define association here
            }
      }
      GroupMember.init(
            {
                  idUser: DataTypes.NUMBER,
                  idGroupConversation: DataTypes.NUMBER,
                  role: DataTypes.STRING,
                  type: DataTypes.NUMBER,
            },
            {
                  sequelize,
                  modelName: "GroupMember",
            },
      );
      return GroupMember;
};
