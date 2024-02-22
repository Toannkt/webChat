/** @format */

import userService from "../services/userService";
import JWTAction from "../middleware/JWTAction";
const cookieParser = require("cookie-parser");

let handleLogin = async (req, res) => {
      let email = req.body.email;
      let password = req.body.password;
      console.log(email, password);
      if (!email || !password) {
            return res.status(500).json({
                  EC: 1,
                  EM: "Missing enter email or password",
            });
      }
      let userData = await userService.handleUserLogin(email, password);
      if (userData.data.access_token) {
            console.log("save cookies");
            res.cookie("access_token", userData.data.access_token, {
                  httpOnly: true,
                  maxAge: 3600, // Thời gian sống của cookie (đơn vị là giây), ví dụ là 1 giờ
                  path: "/", // Đường dẫn mà cookie áp dụng
            });
      }
      return res.status(200).json({
            errCode: userData.EC,
            message: userData.EM,
            user: userData.data ? userData.data : {},
      });
};
let getIdUser = (req) => {
      const authHeader = req.headers["authorization"];
      const tokenParts = authHeader.split(" ");
      const access_token = tokenParts[1];
      const decode = JWTAction.verifyToken(access_token);
      console.log(decode);
      return decode.idUser;
};
let handleLogout = async (req, res) => {
      const idUser = getIdUser(req);
      userService.logout(idUser);
      res.clearCookie("token");
      res.status(200).json({ message: "Đăng xuất thành công" });
};

let handleSendMessageConversation = async (req, res) => {
      let idUserReceiver = req.body.idUserReceiver;
      let chatId = req.body.chatId;
      let idUserSender = getIdUser(req);
      let content = req.body.content;
      let result = await userService.sendMessageConversation(idUserReceiver, idUserSender, content, chatId);
      return res.status(200).json(result);
};

let handleCreateNewUser = async (req, res) => {
      let message = await userService.createNewUser(req.body);
      console.log(message);
      return res.status(200).json(message);
};

let handlePinConversation = async (req, res) => {
      let idConversation = req.params.conversationId;
      let action = req.params.action;
      let result = await userService.pinConversation(idConversation, action);
      return res.status(200).json(result);
};

let handlePinCode = async (req, res) => {
      let idConversation = req.body.idConversation;
      let pinCode = req.body.pinCode;
      let result = await userService.pinCode(idConversation, pinCode);
      return res.status(200).json(result);
};

let handleCreateGroup = async (req, res) => {
      let data = req.body;
      const creatorUserId = getIdUser(req);
      let result = await userService.createGroup(data, creatorUserId);
      return res.status(200).json(result);
};

let handleStatusMessage = async (req, res) => {
      let idUser = getIdUser(req);
      let status = req.params.type;
      let result = await userService.statusMessage(status, idUser);
      return res.status(200).json(result);
};

let handleUnhiddenConversation = async (req, res) => {
      let idConversation = req.body.idConversation;
      let pinCode = req.body.pinCode;
      let result = await userService.unhiddenConversation(pinCode, idConversation);
      return res.status(200).json(result);
};

let handleCreateVote = async (req, res) => {
      let { title, chatId, endDate, option } = req.body;
      let creatorUserId = getIdUser(req);
      let result = await userService.createVote(title, chatId, endDate, creatorUserId, option);
      return res.status(200).json(result);
};

let handleCloseVote = async (req, res) => {
      let { idVote, isClose } = req.body;
      let idUser = getIdUser(req);
      let result = await userService.closeVote(idVote, isClose, idUser);
      return res.status(200).json(result);
};

let handleReviewMember = async (req, res) => {
      let isReviewMember = req.body.isReviewMember;
      let creatorUserId = getIdUser(req);
      let idGroup = req.body.idGroup;
      let result = await userService.reviewMember(creatorUserId, idGroup, isReviewMember);
      return res.status(200).json(result);
};
let handleMultipleOption = async (req, res) => {
      let isAllowMultipleOptions = req.body.isAllowMultipleOptions;
      let creatorUserId = getIdUser(req);
      let idGroup = req.body.idGroup;
      let result = await userService.multipleOption(creatorUserId, idGroup, isAllowMultipleOptions);
      return res.status(200).json(result);
};
let handleAddOption = async (req, res) => {
      let isAllowAddingOptions = req.body.isAllowAddingOptions;
      let creatorUserId = getIdUser(req);
      let idGroup = req.body.idGroup;
      let result = await userService.addOption(creatorUserId, idGroup, isAllowAddingOptions);
      return res.status(200).json(result);
};
let handleHiddenResult = async (req, res) => {
      let isHideResultsBeforeVoting = req.body.isHideResultsBeforeVoting;
      let creatorUserId = getIdUser(req);
      let idGroup = req.body.idGroup;
      let result = await userService.hiddenResult(creatorUserId, idGroup, isHideResultsBeforeVoting);
      return res.status(200).json(result);
};
let handleHiddenAnser = async (req, res) => {
      let isHideOthersAnswers = req.body.isHideOthersAnswers;
      let creatorUserId = getIdUser(req);
      let idGroup = req.body.idGroup;
      let result = await userService.hiddenAnswer(creatorUserId, idGroup, isHideOthersAnswers);
      return res.status(200).json(result);
};

let handlePinvote = async (req, res) => {
      let { idVote, isPin } = req.body;
      let userId = getIdUser(req);
      let result = await userService.pinVote(userId, idVote, isPin);
      return res.status(200).json(result);
};

let handlePinMessage = async (req, res) => {
      let { idMessage, isPin } = req.body;
      let userId = getIdUser(req);
      let result = await userService.pinMessage(userId, idMessage, isPin);
      return res.status(200).json(result);
};

module.exports = {
      handleLogin: handleLogin,
      handleLogout: handleLogout,
      handleSendMessageConversation: handleSendMessageConversation,
      handleCreateNewUser: handleCreateNewUser,
      handlePinConversation: handlePinConversation,
      handlePinCode: handlePinCode,
      handleCreateGroup: handleCreateGroup,
      handleStatusMessage: handleStatusMessage,
      handleUnhiddenConversation: handleUnhiddenConversation,
      handleCreateVote: handleCreateVote,
      handleCloseVote: handleCloseVote,
      handleReviewMember: handleReviewMember,
      handleMultipleOption: handleMultipleOption,
      handleAddOption: handleAddOption,
      handleHiddenResult: handleHiddenResult,
      handleHiddenAnser: handleHiddenAnser,
      handlePinvote: handlePinvote,
      handlePinMessage: handlePinMessage,
};
