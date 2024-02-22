/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class User extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            // static associate(models) {
            //       User.belongsTo(models.Allcodes, {
            //             foreignKey: "positionId",
            //             targetKey: "keyMap",
            //             as: "positionData",
            //       });
            //       User.belongsTo(models.Allcodes, {
            //             foreignKey: "gender",
            //             targetKey: "keyMap",
            //             as: "genderData",
            //       });
            //       User.hasOne(models.Markdown, { foreignKey: "doctorId" });
            //       User.hasOne(models.Doctor_Infor, { foreignKey: "doctorId" });
            //       User.hasMany(models.Schedule, { foreignKey: "doctorId", as: "doctorData" });
            // }
      }
      User.init(
            {
                  userName: DataTypes.STRING,
                  email: DataTypes.STRING,
                  password: DataTypes.STRING,
                  roleId: DataTypes.STRING,
                  avatarUrl: DataTypes.STRING,
                  firstName: DataTypes.STRING,
                  lastName: DataTypes.STRING,
                  onlineStatus: DataTypes.NUMBER,
            },
            {
                  sequelize,
                  modelName: "User",
            },
      );
      return User;
};
