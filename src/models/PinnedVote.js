/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class PinnedVote extends Model {
            static associate(models) {
                  // define association here
            }
      }
      PinnedVote.init(
            {
                  voteId: DataTypes.NUMBER,
                  isPin: DataTypes.NUMBER,
                  pinnedUserId: DataTypes.NUMBER,
            },
            {
                  sequelize,
                  modelName: "PinnedVote",
            },
      );
      return PinnedVote;
};
