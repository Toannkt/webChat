/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class BlackList extends Model {
            static associate(models) {
                  // define association here
            }
      }
      BlackList.init(
            {
                  OwnerUserId: DataTypes.NUMBER,
                  BlockedUserId: DataTypes.NUMBER,
            },
            {
                  sequelize,
                  modelName: "BlackList",
            },
      );
      return BlackList;
};
