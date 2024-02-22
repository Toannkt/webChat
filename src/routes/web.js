/** @format */

import express from "express";
import userController from "../controllers/userController";
import authUser from "../middleware/authUser";
let router = express.Router();

let initWebRoutes = (app) => {
      // DMAC
      router.post("/api/auth/register", userController.handleCreateNewUser);
      router.post("/api/auth/login", userController.handleLogin);
      router.post("/api/auth/logout", userController.handleLogout);
      router.post("/api/setting/status-message/:type", authUser.authUser, userController.handleStatusMessage);

      //Conversation
      router.post("/api/message", authUser.authUser, userController.handleSendMessageConversation);
      // pin conversation
      router.put("/api/conversation/:conversationId/:action", authUser.authUser, userController.handlePinConversation);
      //pin code conversation
      router.put("/api/conversation/pin-code", authUser.authUser, userController.handlePinCode);
      //create group
      router.post("/api/group", authUser.authUser, userController.handleCreateGroup);
      router.post("/api/conversation/unhidden", authUser.authUser, userController.handleUnhiddenConversation);

      // create vote
      router.post("/api/conversation/vote", authUser.authUser, userController.handleCreateVote);
      router.post("/api/vote/close", authUser.authUser, userController.handleCloseVote);
      //setting group
      router.post("/api/conversation/group/review-member", authUser.authUser, userController.handleReviewMember);
      router.post("/api/conversation/group/multiple-option", authUser.authUser, userController.handleMultipleOption);
      router.post("/api/conversation/group/add-option", authUser.authUser, userController.handleAddOption);
      router.post("/api/conversation/group/hidden-result", authUser.authUser, userController.handleHiddenResult);
      router.post("/api/conversation/group/hidden-answer", authUser.authUser, userController.handleHiddenAnser);

      //pin vote
      router.post("/api/vote/pin", authUser.authUser, userController.handlePinvote);
      // pin message
      router.post("/api/message/pin", authUser.authUser, userController.handlePinMessage);

      // black list
      // router.post("/api/user/black-list", authUser.authUser, userController.handleBlackList);

      return app.use("/", router);
};

module.exports = initWebRoutes;
