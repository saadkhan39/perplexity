import { generateResponse, generateChatTitle } from "../service/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import imagekit from "../service/storage.service.js";

export async function sendMessage(req, res) {
  try {
    let { message, chat: chatId } = req.body;
    const image = req.file;

    let imageUrl = "";

if (image) {
  const uploaded = await imagekit.upload({
    file: image.buffer,
    fileName: `${Date.now()}-${image.originalname}`,
    folder:"perplexity"
  });

  imageUrl = uploaded.url;
}

    // Handle FormData "null"
    if (chatId === "null" || chatId === "undefined" || chatId === "") {
      chatId = null;
    }

    if (!message && !image) {
      return res.status(400).json({
        message: "Message or image is required",
      });
    }

    console.log("Message:", message);
    console.log("ChatId:", chatId);
    console.log("Image:", image ? "Uploaded" : "No image");

    let chat = null;
    let title = null;

    // Create chat if first message
    if (!chatId) {
      title = await generateChatTitle(message || "Image Chat");

      chat = await chatModel.create({
        user: req.user.id,
        title,
      });

      chatId = chat._id;
    } else {
      chat = await chatModel.findById(chatId);
    }

    // Save user message
  const userMessage = await messageModel.create({
  chat: chatId,
  content: message || "",
  image: imageUrl,
  role: "user",
});

    // Get conversation history
    const messages = await messageModel.find({ chat: chatId });

    // Generate AI response
    const result = await generateResponse(messages, image);

    // Save AI message
    const aiMessage = await messageModel.create({
      chat: chatId,
      content: result,
      role: "ai",
    });

 res.status(201).json({
  title: chat.title,
  chat,
  userMessage,
  aiMessage,
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getChats(req, res) {
  try {
    const chats = await chatModel.find({
      user: req.user.id,
    });

    res.status(200).json({
      message: "Chats retrieved successfully",
      chats,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getMessages(req, res) {
  try {
    const { chatId } = req.params;

    const chat = await chatModel.findOne({
      _id: chatId,
      user: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    const messages = await messageModel.find({
      chat: chatId,
    });

    res.status(200).json({
      message: "Messages retrieved successfully",
      messages,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function deleteChat(req, res) {
  try {
    const { chatId } = req.params;

    const chat = await chatModel.findOneAndDelete({
      _id: chatId,
      user: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    await messageModel.deleteMany({
      chat: chatId,
    });

    res.status(200).json({
      message: "Chat deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createNewChat(req, res) {
  try {
    const chat = await chatModel.create({
      user: req.user.id,
      title: "New Chat",
    });

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}