import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

// send message to ai
export async function sendMessage(req, res) {
    const { message, chat: chatId } = req.body;



    let title = null, chat = null

    if (!chatId) {
        title = await generateChatTitle(message);
        chat = await chatModel.create({
            user: req.user.id,
            title: title,
        })
    }

    const userMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: message,
        role: "user"
    })

    const messages = await messageModel.find({
        chat: chatId || chat._id
    })

    const result = await generateResponse(messages);

    const aiMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: result,
        role: "ai"
    })



    return res.status(201).json({
        title,
        chat,
        aiMessage,
        userMessage
    })

}

// get all chats of a user
export async function getChats(req, res) {

    const chats = await chatModel.find({
        user: req.user.id
    })
    
    
    return res.status(200).json({
        message: "Chats fetched successfully",
        chats
    })
}

// get all messages of a chat
export async function getMessages(req, res) {

    const { chatId } = req.params;

    // chat must be of the user
    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    // get all messages of the chat
    const messages = await messageModel.find({
        chat: chatId
    })

    return res.status(200).json({
        message: "Message retrieved successfully",
        messages
    })
}

// delete a chat
export async function deleteChat(req, res) {

    const { chatId } = req.params;

    // chat must be of the user
    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    // delete the chat
    await chatModel.deleteOne({
        _id: chatId
    })

    // delete all messages of the chat
    await messageModel.deleteMany({
        chat: chatId
    })

    return res.status(200).json({
        message: "Chat deleted successfully"
    })
}
