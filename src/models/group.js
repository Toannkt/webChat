/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Group extends Model {
            static associate(models) {
                  // define association here
            }
      }
      Group.init(
            {
                  groupName: DataTypes.STRING,
                  desc: DataTypes.STRING,
                  creatorUserId: DataTypes.NUMBER,
                  typeGroup: DataTypes.NUMBER,
                  isReviewMember: DataTypes.NUMBER,
                  isAllowMultipleOptions: DataTypes.NUMBER,
                  isAllowAddingOptions: DataTypes.NUMBER,
                  isHideResultsBeforeVoting: DataTypes.NUMBER,
                  isHideOthersAnswers: DataTypes.NUMBER,
            },
            {
                  sequelize,
                  modelName: "Group",
            },
      );
      return Group;
};
