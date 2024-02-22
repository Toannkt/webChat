/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class GroupInvitation extends Model {
            static associate(models) {
                  // define association here
            }
      }
      //statusInvition: 0: pendding ; 1: accepted ; 2: rejected
      GroupInvitation.init(
            {
                  inviterUserId: DataTypes.NUMBER,
                  inviteeUserId: DataTypes.NUMBER,
                  groupId: DataTypes.NUMBER,
                  statusInvition: DataTypes.NUMBER,
            },
            {
                  sequelize,
                  modelName: "GroupInvitation",
            },
      );
      return GroupInvitation;
};
