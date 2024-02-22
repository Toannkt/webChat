/** @format */

require("dotenv").config();
import jwt from "jsonwebtoken";
const createJWT = (payload) => {
      let key = process.env.JWT_SECRET;
      let token;
      try {
            token = jwt.sign(payload, key);
      } catch (err) {
            console.log(err);
      }

      return token;
};
const verifyToken = (token) => {
      let key = process.env.JWT_SECRET;
      let decoded = null;
      try {
            decoded = jwt.verify(token, key);
      } catch (e) {
            console.log(e);
      }
      return decoded;
};

module.exports = {
      createJWT: createJWT,
      verifyToken: verifyToken,
};
