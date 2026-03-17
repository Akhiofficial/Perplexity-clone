import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { sendMessage, getChats, getMessages, deleteChat } from "../controllers/chat.controller.js";

const chatRouter = Router();

/**
 * @Route /api/chats/message  
 * @Method POST
 * @Description Send a message
 * @Access Private
 */
chatRouter.post("/message", authUser, sendMessage)

/**
 * @Route /api/chats
 * @Method GET
 * @Description Get all chats of a user
 * @Access Private
 */
chatRouter.get("/", authUser, getChats)


/**
 * @Route /api/chats/:chatId/messages
 * @Method GET
 * @Description Get all messages of a chat
 * @Access Private
 */
chatRouter.get("/:chatId/messages", authUser, getMessages)


/**
 * @Route /api/chats/delete/:chatId
 * @Method DELETE
 * @Description Delete a chat
 * @Access Private
 */
chatRouter.delete("/delete/:chatId", authUser, deleteChat)



export default chatRouter;