import { Router } from 'express';
import { sendMessage, getChats, getMessages, deleteChat ,createNewChat } from "../controllers/chat.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
import upload from '../middleware/upload.middleware.js';

const chatRouter = Router();

chatRouter.post("/message",upload.single("image"), authUser, sendMessage)

chatRouter.get("/", authUser, getChats)

chatRouter.get("/:chatId/messages", authUser, getMessages)

chatRouter.delete("/delete/:chatId", authUser, deleteChat)

chatRouter.post("/new-chat",authUser,createNewChat)



export default chatRouter;