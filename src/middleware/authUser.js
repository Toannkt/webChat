/** @format */

import JWTAction from "./JWTAction";
require("dotenv").config();

const authUser = (req, res, next) => {
      const authHeader = req.headers["authorization"];
      if (authHeader) {
            // Kiểm tra xem giá trị Authorization có đúng định dạng Bearer Token không
            const tokenParts = authHeader.split(" ");
            if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
                  const access_token = tokenParts[1];
                  const decode = JWTAction.verifyToken(access_token);
                  if (decode) {
                        next();
                  } else {
                        res.status(401).json({ message: "Bearer Token không hợp lệ" });
                  }
            } else {
                  res.status(401).json({ message: "Định dạng Bearer Token không hợp lệ" });
            }
      } else {
            res.status(401).json({ message: "Không có Bearer Token trong headers" });
      }
};

module.exports = {
      authUser: authUser,
};
