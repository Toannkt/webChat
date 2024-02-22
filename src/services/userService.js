/** @format */

import bcrypt from "bcryptjs";
import db from "../models/index";
import JWTAction from "../middleware/JWTAction";
const salt = bcrypt.genSaltSync(10);

const handleUserLogin = (email, password) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let userData = {};
                  let isExist = await checkUserEmail(email);
                  console.log("test login");
                  if (isExist) {
                        let user = await db.User.findOne({
                              raw: true,
                              attributes: ["email", "password", "firstName", "lastName", "id", "roleId"],
                              where: { email: email },
                        });
                        let userOnline = await db.User.findOne({
                              where: { email: email },
                              raw: false,
                        });
                        if (user) {
                              let check = await bcrypt.compareSync(password, user.password);
                              if (check) {
                                    console.log(user.email, user.roleId, user.id);
                                    let payload = {
                                          email: user.email,
                                          roleId: user.roleId,
                                          idUser: user.id,
                                    };
                                    const token = JWTAction.createJWT(payload);
                                    userData.EC = 0;
                                    userData.EM = "Ok!";
                                    delete user.password;
                                    userData.data = {
                                          user: user,
                                          access_token: token,
                                    };
                                    userOnline.onlineStatus = 1;
                                    await userOnline.save();
                              } else {
                                    userData.EC = 3;
                                    userData.EM = "Wrong Password!";
                              }
                        } else {
                              userData.EC = 2;
                              userData.EM = `User's not found!`;
                        }
                        resolve(userData);
                  } else {
                        userData.EC = 1;
                        userData.EM = `Your's Email isn't exist in your system. Plz try other Email!`;
                        resolve(userData);
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const logout = (idUser) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let user = await db.User.findOne({
                        where: { id: idUser },
                        raw: false,
                  });
                  if (user) {
                        user.onlineStatus = 0;
                        await user.save();

                        resolve({
                              EM: "OK",
                              EC: 0,
                        });
                  } else {
                        resolve({
                              EM: "Logout failed!",
                              EC: 2,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const sendMessageConversation = (idUserReceiver, idUserSender, content, chatId) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idUserSender || !content) {
                        resolve({
                              EM: "Missing parameters idUserSender || content",
                              EC: 1,
                        });
                  } else {
                        // new conversation private
                        if (!chatId) {
                              if (!idUserReceiver) {
                                    resolve({
                                          EM: "Missing parameters idUserReceiver",
                                          EC: 1,
                                    });
                              } else {
                                    let checkChatId = await db.Message.findOne({
                                          where: {
                                                idUserReceiver: idUserReceiver,
                                                idUserSender: idUserSender,
                                          },
                                    });
                                    if (checkChatId) {
                                          resolve({
                                                EM: "Missing parameter chatId",
                                                EC: 1,
                                          });
                                    } else {
                                          let conversation = await db.Conversations.create({
                                                chatName: idUserSender + "&" + idUserReceiver,
                                                type: "PRIVATE",
                                                isPin: 0,
                                                pinCode: "null",
                                          });
                                          let idConversation = conversation.id;
                                          let message = await db.Message.create({
                                                content: content,
                                                sendAt: "ignore",
                                                seenAt: "ignore",
                                                idUserSender: idUserSender,
                                                idUserReceiver: idUserReceiver,
                                                chatId: idConversation,
                                          });
                                          resolve({
                                                EM: "Ok",
                                                EC: 0,
                                                conversation: conversation,
                                                message: message,
                                          });
                                    }
                              }
                        } else {
                              // private message
                              if (idUserReceiver && idUserSender) {
                                    let message = await db.Message.create({
                                          content: content,
                                          sendAt: "ignore",
                                          seenAt: "ignore",
                                          idUserSender: idUserSender,
                                          idUserReceiver: idUserReceiver,
                                          chatId: chatId,
                                    });
                                    resolve({
                                          EM: "Ok",
                                          EC: 0,
                                          message: message,
                                    });
                              }
                              // group chat : GROUP
                              if (idUserSender && !idUserReceiver) {
                                    let conersationGroup = await db.Conversations.findOne({
                                          where: {
                                                id: chatId,
                                          },
                                    });
                                    let idGroup = conersationGroup.idGroup;
                                    console.log("idGroup: ", idGroup);
                                    let checkMemberGroup = await db.GroupMember.findOne({
                                          where: {
                                                idGroupConversation: idGroup,
                                                idUser: idUserSender,
                                                type: {
                                                      [db.Sequelize.Op.lte]: 4,
                                                },
                                          },
                                    });
                                    if (!checkMemberGroup) {
                                          resolve({
                                                EM: "User isn't in the group",
                                                EC: 1,
                                          });
                                    } else {
                                          let message = await db.Message.create({
                                                content: content,
                                                sendAt: "ignore",
                                                seenAt: "ignore",
                                                idUserSender: idUserSender,
                                                chatId: chatId,
                                          });
                                          resolve({
                                                EM: "Ok",
                                                EC: 0,
                                                message: message,
                                          });
                                    }
                              } else {
                                    resolve({
                                          EM: "Wrong something",
                                          EC: 3,
                                    });
                              }
                        }
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const getAllUsers = (userId) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let users = "";
                  if (userId === "All") {
                        users = await db.User.findAll({
                              attributes: {
                                    exclude: ["password"],
                              },
                        });
                  }
                  if (userId !== "All" && userId) {
                        users = await db.User.findOne({
                              attributes: {
                                    exclude: ["password"],
                              },
                              where: { id: userId },
                        });
                  }
                  resolve(users);
            } catch (e) {
                  reject(e);
            }
      });
};

const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
};

const checkUserEmail = (email) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let checkEmail = await db.User.findOne({
                        where: { email: email },
                  });
                  if (checkEmail) resolve(true);
                  else resolve(false);
            } catch (e) {
                  reject(e);
            }
      });
};

const checkUserName = (userName) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let checkUserName = await db.User.findOne({
                        where: { userName: userName },
                  });
                  if (checkUserName) resolve(true);
                  else resolve(false);
            } catch (e) {
                  reject(e);
            }
      });
};

const hashUserPassword = (password) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let hashPassword = await bcrypt.hashSync(password, salt);
                  resolve(hashPassword);
            } catch (e) {
                  reject(e);
            }
      });
};

const createNewUser = async (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let verifyEmail = isValidEmail(data.email);
                  if (verifyEmail != true) {
                        resolve({
                              EC: 2,
                              EM: "Invalid email!",
                        });
                  }
                  let checkEmail = await checkUserEmail(data.email);
                  let isUserName = await checkUserName(data.userName);
                  if (checkEmail && isUserName) {
                        resolve({
                              EC: 1,
                              EM: "Email | userName is already exist!",
                        });
                  } else {
                        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                        await db.User.create({
                              email: data.email,
                              userName: data.userName,
                              password: hashPasswordFromBcrypt,
                              roleId: "MEMBER",
                              firstName: data.firstName,
                              lastName: data.lastName,
                              onlineStatus: 0,
                        });
                        resolve({
                              EC: 0,
                              EM: "OK",
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const pinConversation = async (idConversation, action) => {
      return new Promise(async (resolve, reject) => {
            try {
                  console.log(idConversation);
                  let conversation = await db.Conversations.findOne({
                        where: { id: idConversation },
                        raw: false,
                  });
                  console.log(conversation.isPin);
                  if (conversation) {
                        if (action) {
                              if (action === "pin" || action === "unpin") {
                                    if (action === "pin") {
                                          console.log("pinAction");

                                          conversation.isPin = 1;
                                          await conversation.save();
                                    }
                                    if (action === "unpin") {
                                          conversation.isPin = 0;
                                          await conversation.save();
                                    }

                                    resolve({
                                          EM: "OK",
                                          EC: 0,
                                    });
                              } else {
                                    resolve({
                                          EM: "action have must pin/unpin",
                                          EC: 0,
                                    });
                              }
                        } else {
                              resolve({
                                    EM: "Action(pin/unPin) missing parameter",
                                    EC: 2,
                              });
                        }
                  } else {
                        resolve({
                              EM: "Conversation does not exist!",
                              EC: 2,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const pinCode = async (idConversation, pinCode) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let conversation = await db.Conversations.findOne({
                        where: { id: idConversation },
                        raw: false,
                  });
                  if (conversation) {
                        if (pinCode) {
                              conversation.pinCode = pinCode;
                              await conversation.save();

                              resolve({
                                    EM: "OK",
                                    EC: 0,
                              });
                        } else {
                              resolve({
                                    EM: "Missing parameter pinCode",
                                    EC: 2,
                              });
                        }
                  } else {
                        resolve({
                              EM: "Conversation does not exist!",
                              EC: 2,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};
// data: groupName, desc, creatorUserId, typeGroup, idUserInvitation
const createGroup = async (data, creatorUserId) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!data.groupName || !data.desc || !data.typeGroup || !creatorUserId) {
                        resolve({
                              EM: "Missing parameter!",
                              EC: "2",
                        });
                  } else {
                        let group = await db.Group.create({
                              groupName: data.groupName,
                              desc: data.desc,
                              creatorUserId: creatorUserId,
                              typeGroup: data.typeGroup,
                              isReviewMember: 1,
                              isAllowMultipleOptions: 1,
                              isAllowAddingOptions: 1,
                              isHideResultsBeforeVoting: 0,
                              isHideOthersAnswers: 0,
                        });
                        let idGroup = group.id;
                        await db.GroupMember.create({
                              idUser: creatorUserId,
                              idGroupConversation: idGroup,
                              role: "OWNER",
                              type: 1,
                        });
                        let conversation = await db.Conversations.create({
                              chatName: data.groupName,
                              type: "GROUP",
                              isPin: 0,
                              pinCode: "null",
                              idGroup: group.id,
                        });
                        if (data.idInvitee) {
                              let dataInvitee = await db.User.findOne({
                                    where: { id: data.idInvitee },
                              });
                              if (!dataInvitee) {
                                    resolve({
                                          EM: "OK",
                                          EC: 0,
                                          group: group,
                                          conversation: conversation,
                                          invitee: "User is not exist!",
                                    });
                              } else {
                                    await db.GroupMember.create({
                                          idUser: data.idInvitee,
                                          idGroupConversation: idGroup,
                                          role: "MEMBER",
                                          type: 4,
                                    });
                                    let fullName = dataInvitee.lastName + dataInvitee.firstName;
                                    resolve({
                                          EM: "OK",
                                          EC: 0,
                                          group: group,
                                          conversation: conversation,
                                          invitee: {
                                                "Full name": fullName,
                                                id: data.idInvitee,
                                          },
                                    });
                              }
                        } else {
                              resolve({
                                    EM: "OK",
                                    EC: 0,
                                    group: group,
                                    conversation: conversation,
                              });
                        }
                        console.log(group.id);
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const statusMessage = async (type, idUser) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!type) {
                        resolve({
                              EM: "Missing type parameter",
                              EC: 1,
                        });
                  } else {
                        if (type === "on" || type === "off") {
                              let user = await db.User.findOne({
                                    where: { id: idUser },
                                    raw: false,
                              });
                              if (type === "on") {
                                    user.onlineStatus = 1;
                                    await user.save();
                              } else {
                                    user.onlineStatus = 0;
                                    await user.save();
                              }
                              resolve({
                                    EM: "Ok",
                                    EC: 0,
                              });
                        } else {
                              console.log("type: ", type);
                              resolve({
                                    EM: "Type must be on or off, please check again ",
                                    EC: 1,
                              });
                        }
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const unhiddenConversation = async (pinCode, idConversation) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!pinCode) {
                        resolve({
                              EM: "Missing pinCode parameter",
                              EC: 1,
                        });
                  } else {
                        let conversation = await db.Conversations.findOne({
                              where: { id: idConversation },
                              raw: false,
                        });
                        if (pinCode === conversation.pinCode) {
                              conversation.pinCode = "null";
                              await conversation.save();
                        }
                        resolve({
                              EM: "Ok, Unhidden chat successfully",
                              EC: 0,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const createVote = (title, chatId, endDate, creatorUserId, option) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!title || !chatId || !endDate || !creatorUserId || !option) {
                        resolve({
                              EM: "Missing parameters",
                              EC: 1,
                        });
                  } else {
                        let lengthOption = option.length;
                        if (lengthOption < 2) {
                              resolve({
                                    EM: "options must be at least 2",
                                    EC: 3,
                              });
                        } else {
                              let vote = await db.Vote.create({
                                    title: title,
                                    creatorUserId: creatorUserId,
                                    chatId: chatId,
                                    endDate: endDate,
                                    isClose: 0,
                              });
                              let idVote = vote.id;
                              for (var i = 0; i < lengthOption; i++) {
                                    await db.VoteOption.create({
                                          idVote: idVote,
                                          optionName: option[i],
                                          creatorUserId: creatorUserId,
                                    });
                              }
                              resolve({
                                    EM: "Ok",
                                    EC: 0,
                                    vote: vote,
                                    options: option,
                              });
                        }
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const closeVote = (idVote, isClose, idUser) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idVote || !idUser | !isClose) {
                        resolve({
                              EM: "Missing parameter",
                              EC: 1,
                        });
                  } else {
                        // check user permissions: creator || owner group is allowed
                        let checkUserPermission = await db.Vote.findOne({
                              where: {
                                    creatorUserId: idUser,
                                    id: idVote,
                              },
                              raw: false,
                        });
                        if (checkUserPermission) {
                              checkUserPermission.isClose = isClose;
                              await checkUserPermission.save();
                              resolve({
                                    EM: "Ok",
                                    EC: 0,
                              });
                        } else {
                              let vote = await db.Vote.findOne({
                                    where: {
                                          id: idVote,
                                    },
                              });
                              let idChat = vote.chatId;
                              let conversation = await db.Conversations.findOne({
                                    where: {
                                          id: idChat,
                                          type: "GROUP",
                                    },
                              });
                              if (conversation) {
                                    let group = await db.Group.findOne({
                                          where: {
                                                id: conversation.idGroup,
                                          },
                                    });
                                    if (group) {
                                          let ownerId = group.creatorUserId;
                                          if (ownerId === idUser) {
                                                checkUserPermission.isClose = isClose;
                                                await checkUserPermission.save();
                                                resolve({
                                                      EM: "Ok",
                                                      EC: 0,
                                                });
                                          } else {
                                                resolve({
                                                      EM: "User permissions",
                                                      EC: 0,
                                                });
                                          }
                                    } else {
                                          resolve({
                                                EM: "Group is not exist",
                                                EC: 1,
                                          });
                                    }
                              } else {
                                    resolve({
                                          EM: "Conversation is not exist",
                                          EC: 1,
                                    });
                              }
                        }
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const reviewMember = (creatorUserId, idGroup, isReviewMember) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let group = await db.Group.findOne({
                        where: { id: idGroup },
                        raw: false,
                  });
                  if (group) {
                        let checkUser = creatorUserId === group.creatorUserId;
                        if (checkUser) {
                              if (!isReviewMember) {
                                    resolve({
                                          EM: "Missing parameter isReviewMember",
                                          EC: 1,
                                    });
                              } else {
                                    group.isReviewMember = isReviewMember;
                                    await group.save();
                                    resolve({
                                          EM: "Ok",
                                          EC: 0,
                                          group: group,
                                    });
                              }
                        } else {
                              resolve({
                                    EM: "User has no permissionser",
                                    EC: 2,
                              });
                        }
                  } else {
                        resolve({
                              EM: "Group is not exist",
                              EC: 2,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const multipleOption = (creatorUserId, idGroup, isAllowMultipleOptions) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let group = await db.Group.findOne({
                        where: { id: idGroup },
                        raw: false,
                  });
                  if (group) {
                        let checkUser = creatorUserId === group.creatorUserId;
                        if (checkUser) {
                              if (!isAllowMultipleOptions) {
                                    resolve({
                                          EM: "Missing parameter isAllowMultipleOptions",
                                          EC: 1,
                                    });
                              } else {
                                    group.isAllowMultipleOptions = isAllowMultipleOptions;
                                    await group.save();
                                    resolve({
                                          EM: "Ok",
                                          EC: 0,
                                          group: group,
                                    });
                              }
                        } else {
                              resolve({
                                    EM: "User has no permissionser",
                                    EC: 2,
                              });
                        }
                  } else {
                        resolve({
                              EM: "Group is not exist",
                              EC: 2,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const addOption = (creatorUserId, idGroup, isAllowAddingOptions) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let group = await db.Group.findOne({
                        where: { id: idGroup },
                        raw: false,
                  });
                  if (group) {
                        let checkUser = creatorUserId === group.creatorUserId;
                        if (checkUser) {
                              if (!isAllowAddingOptions) {
                                    resolve({
                                          EM: "Missing parameter isAllowAddingOptions",
                                          EC: 1,
                                    });
                              } else {
                                    group.isAllowAddingOptions = isAllowAddingOptions;
                                    await group.save();
                                    resolve({
                                          EM: "Ok",
                                          EC: 0,
                                          group: group,
                                    });
                              }
                        } else {
                              resolve({
                                    EM: "User has no permissionser",
                                    EC: 2,
                              });
                        }
                  } else {
                        resolve({
                              EM: "Group is not exist",
                              EC: 2,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const hiddenResult = (creatorUserId, idGroup, isHideResultsBeforeVoting) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let group = await db.Group.findOne({
                        where: { id: idGroup },
                        raw: false,
                  });
                  if (group) {
                        let checkUser = creatorUserId === group.creatorUserId;
                        if (checkUser) {
                              if (!isHideResultsBeforeVoting) {
                                    resolve({
                                          EM: "Missing parameter isHideResultsBeforeVoting",
                                          EC: 1,
                                    });
                              } else {
                                    group.isHideResultsBeforeVoting = isHideResultsBeforeVoting;
                                    await group.save();
                                    resolve({
                                          EM: "Ok",
                                          EC: 0,
                                          group: group,
                                    });
                              }
                        } else {
                              resolve({
                                    EM: "User has no permissionser",
                                    EC: 2,
                              });
                        }
                  } else {
                        resolve({
                              EM: "Group is not exist",
                              EC: 2,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const hiddenAnswer = (creatorUserId, idGroup, isHideOthersAnswers) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let group = await db.Group.findOne({
                        where: { id: idGroup },
                        raw: false,
                  });
                  if (group) {
                        let checkUser = creatorUserId === group.creatorUserId;
                        if (checkUser) {
                              if (!isHideOthersAnswers) {
                                    resolve({
                                          EM: "Missing parameter isHideOthersAnswers",
                                          EC: 1,
                                    });
                              } else {
                                    group.isHideOthersAnswers = isHideOthersAnswers;
                                    await group.save();
                                    resolve({
                                          EM: "Ok",
                                          EC: 0,
                                          group: group,
                                    });
                              }
                        } else {
                              resolve({
                                    EM: "User has no permissionser",
                                    EC: 2,
                              });
                        }
                  } else {
                        resolve({
                              EM: "Group is not exist",
                              EC: 2,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const pinVote = (userId, idVote, isPin) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!userId || !idVote || !isPin) {
                        resolve({
                              EM: "Missing parameter",
                              EC: 1,
                        });
                  } else {
                        let checkIdVote = await db.Vote.findOne({
                              where: {
                                    id: idVote,
                              },
                        });
                        if (checkIdVote) {
                              let chatId = checkIdVote.chatId;
                              let conersationGroup = await db.Conversations.findOne({
                                    where: {
                                          id: chatId,
                                    },
                              });
                              let idGroup = conersationGroup.idGroup;
                              let checkMemberGroup = await db.GroupMember.findOne({
                                    where: {
                                          idGroupConversation: idGroup,
                                          idUser: userId,
                                          type: {
                                                [db.Sequelize.Op.lte]: 4,
                                          },
                                    },
                              });
                              if (checkMemberGroup) {
                                    let pinVote = await db.PinnedVote.create({
                                          voteId: idVote,
                                          pinnedUserId: userId,
                                          isPin: isPin,
                                    });
                                    resolve({
                                          EM: "Ok",
                                          EC: 0,
                                          pinVote: pinVote,
                                    });
                              } else {
                                    resolve({
                                          EM: "User permissions denied",
                                          EC: 1,
                                    });
                              }
                        } else {
                              resolve({
                                    EM: "Vote is not exist",
                                    EC: 1,
                              });
                        }
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const pinMessage = (userId, idMessage, isPin) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!userId || !idMessage || !isPin) {
                        resolve({
                              EM: "Missing parameter",
                              EC: 1,
                        });
                  } else {
                        let checkIdMessage = await db.Message.findOne({
                              where: {
                                    id: idMessage,
                              },
                        });
                        if (checkIdMessage) {
                              let checkUserSender = checkIdMessage.idUserSender === userId;
                              let checkUserReceiver = checkIdMessage.idUserSender === userId;

                              if (checkUserSender || checkUserReceiver) {
                                    let pinMessage = await db.PinnedMessage.create({
                                          messageId: idMessage,
                                          pinnedUserId: userId,
                                          isPin: isPin,
                                    });
                                    resolve({
                                          EM: "Ok",
                                          EC: 0,
                                          pinMessage: pinMessage,
                                    });
                              } else {
                                    // messsage thuộc group
                                    let chatId = checkIdMessage.chatId;
                                    let conersationGroup = await db.Conversations.findOne({
                                          where: {
                                                id: chatId,
                                          },
                                    });
                                    let idGroup = conersationGroup.idGroup;
                                    let checkMemberGroup = await db.GroupMember.findOne({
                                          where: {
                                                idGroupConversation: idGroup,
                                                idUser: idUserSender,
                                                type: {
                                                      [db.Sequelize.Op.lte]: 4,
                                                },
                                          },
                                    });
                                    if (checkMemberGroup) {
                                          let pinMessage = await db.PinnedMessage.create({
                                                messageId: idMessage,
                                                pinnedUserId: userId,
                                                isPin: isPin,
                                          });
                                          resolve({
                                                EM: "Ok",
                                                EC: 0,
                                                pinMessage: pinMessage,
                                          });
                                    } else {
                                          resolve({
                                                EM: "User permissions denied",
                                                EC: 1,
                                          });
                                    }
                              }
                        } else {
                              resolve({
                                    EM: "Message is not exist",
                                    EC: 1,
                              });
                        }
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

module.exports = {
      handleUserLogin: handleUserLogin,
      logout: logout,
      sendMessageConversation: sendMessageConversation,
      checkUserEmail: checkUserEmail,
      getAllUsers: getAllUsers,
      createNewUser: createNewUser,
      pinConversation: pinConversation,
      pinCode: pinCode,
      createGroup: createGroup,
      statusMessage: statusMessage,
      unhiddenConversation: unhiddenConversation,
      createVote: createVote,
      closeVote: closeVote,
      reviewMember: reviewMember,
      multipleOption: multipleOption,
      addOption: addOption,
      hiddenResult: hiddenResult,
      hiddenAnswer: hiddenAnswer,
      pinVote: pinVote,
      pinMessage: pinMessage,
};
