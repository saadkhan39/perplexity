import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
  tool,
  createAgent,
} from "langchain";
import * as z from "zod";

import { searchInternet } from "./internet.service.js";
import { sendEmail } from "./mail.service.js";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GEMNI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const searchInternetTool = tool(searchInternet, {
  name: "searchInternet",
  description: "Search latest information from internet",
  schema: z.object({
    query: z.string(),
  }),
});

const emailTool = tool(sendEmail, {
  name: "emailTool",
  description: "Send email",
  schema: z.object({
    to: z.string(),
    subject: z.string(),
    html: z.string(),
  }),
});

const agent = createAgent({
  model: mistralModel,
  tools: [searchInternetTool, emailTool],
});

export async function generateResponse(messages, image) {
  // IMAGE + TEXT
  if (image) {
    const prompt =
      messages[messages.length - 1]?.content || "Describe this image.";

    const response = await geminiModel.invoke([
      new HumanMessage({
        content: [
          {
            type: "text",
            text: prompt,
          },
          {
            type: "image_url",
            image_url: `data:${image.mimetype};base64,${image.buffer.toString("base64")}`,
          },
        ],
      }),
    ]);

    return response.text;
  }

  // TEXT ONLY
  const response = await agent.invoke({
    messages: [
      new SystemMessage(`
You are a helpful AI assistant.
If latest information is required, use searchInternet tool.
      `),

      ...messages.map((msg) =>
        msg.role === "user"
          ? new HumanMessage(msg.content)
          : new AIMessage(msg.content),
      ),
    ],
  });

  return response.messages[response.messages.length - 1].text;
}

export async function generateChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(`
      You are a helpful assistant that generates consise and descriptive title for chat conversation.
      
      User will provide you with first message of chat conversation , and you will generate a title that
      captures the essence of the conversation of 2-4 words . The title should be clear , relevant and engaging,
      give user a quick understanding of the chat's topic .
     `),

    new HumanMessage(`
      Generate a title for a chat conversation based on the following first message:
      ${message}
      `),
  ]);

  return response.text;
}
