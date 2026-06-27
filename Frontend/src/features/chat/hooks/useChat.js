import { initializeSocketConnection } from "../service/chat.socket";
import { setChats, setCurrentChatId, setError, setLoading, createNewChat , addNewMessage,addMessages,addChat,deleteOldChat,} from "../chat.slice";
import { useDispatch } from "react-redux";
import {sendMessage,getChats,getMessages,deleteChat,} from "../service/chat.api";

export const useChat = () => {
  const dispatch = useDispatch();
  
 async function handleSendMessage({ message, chatId, image }) {
  dispatch(setLoading(true));

  try {
    const data = await sendMessage({ message, chatId, image });

    const { chat, userMessage, aiMessage } = data;

    if (!chatId) {
      dispatch(
        createNewChat({
          chatId: chat._id,
          title: chat.title,
        })
      );
    }

    // Add ONLY the saved user message
    dispatch(
      addNewMessage({
        chatId: chat._id,
        content: userMessage.content,
        image: userMessage.image,
        role: userMessage.role,
      })
    );

    // Add AI response
    dispatch(
      addNewMessage({
        chatId: chat._id,
        content: aiMessage.content,
        role: aiMessage.role,
      })
    );

    dispatch(setCurrentChatId(chat._id));
  } finally {
    dispatch(setLoading(false));
  }
}
  async function handleGetChats() {
    dispatch(setLoading(true));
    const data = await getChats();
    const { chats } = data;
    dispatch(
      setChats(
        chats.reduce((acc, chat) => {
          acc[chat._id] = {
            id: chat._id,
            title: chat.title,
            messages: [],
            lastUpdated: chat.updatedAt,
          };
          return acc;
        }, {}),
      ),
    );
    dispatch(setLoading(false));
  }

  async function handleOpenChat(chatId, chats) {
    console.log(chats[chatId]?.messages.length);

    if (chats[chatId]?.messages.length === 0) {
      const data = await getMessages(chatId);
      const { messages } = data;

      const formattedMessages = messages.map((msg) => ({
        content: msg.content,
          image: msg.image,
        role: msg.role,
      }));

      dispatch(
        addMessages({
          chatId,
          messages: formattedMessages,
        }),
      );
    }
    dispatch(setCurrentChatId(chatId));
  }

  async function handleNewChat() {
    await dispatch(setCurrentChatId(null));
  }

  async function handleDeleteChat(chatId) {
    try {
      await deleteChat(chatId);

      dispatch(deleteOldChat(chatId));
    } catch (error) {
      console.log(error);
    }
  }

  return {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
    handleNewChat,
    handleDeleteChat,
  };
};
