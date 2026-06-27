import axios from "axios";

const api = axios.create({
  baseURL: "https://perplexity-qfgq.onrender.com",
  withCredentials: true,
});

export async function sendMessage({ message, chatId, image }) {
  const formData = new FormData();

  if (message) formData.append("message", message);

  if (chatId) formData.append("chat", chatId);

  if (image) formData.append("image", image);

  const response = await api.post("/api/chats/message", formData);

  return response.data;
}


export async function getChats() {
  const response = await api.get("/api/chats/");
  return response.data;
}

export async function getMessages(chatId) {
  const response = await api.get(`/api/chats/${chatId}/messages`);
  return response.data;
}

export async function deleteChat(chatId) {
  const response = await api.delete(`/api/chats/delete/${chatId}`);
  return response.data;
}

export async function createNewChat() {
  const response = await axios.post("/api/chats/new-chat");
  return response.data;
}
