import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {ChatMistralAI} from "@langchain/mistralai"
import {AIMessage, HumanMessage ,SystemMessage, tool , createAgent} from "langchain"
import * as z from "zod";
import { searchInternet } from "./internet.service.js";
import { sendEmail } from "./mail.service.js";

const gemniModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMNI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
})

//search internet tool
const searchInternetTool= tool(
  searchInternet,
  {
        name: "searchInternet",
        description: "Use this tool to get the latest information from the internet.",
        schema: z.object({
            query: z.string().describe("The search query to look up on the internet.")
        })
    }
)

//email tool
const emailTool= tool(
    sendEmail,
    {
       name:"emailTool",
       description:"Use this tool to send an email",
       schema:z.object({
        to:z.string().describe("The recipient's email address"),
        html:z.string().describe("The HTML content of the email"),
        subject: z.string().describe("The subject of the email"),
       })
    }
)

const agent = createAgent({
  model:mistralModel,
  tools:[searchInternetTool,emailTool]
})

export async function generateResponse(message) {
  
    const response = await agent.invoke({
        messages: [
            new SystemMessage(`
                You are a helpful and precise assistant for answering questions.
                If you don't know the answer, say you don't know. 
                If the question requires up-to-date information, use the "searchInternet" tool to get the latest information from the internet and then answer based on the search results.
            `),
            ...(message.map(msg => {
                if (msg.role == "user") {
                    return new HumanMessage(msg.content)
                } else if (msg.role == "ai") {
                    return new AIMessage(msg.content)
                }
            })) ]
    });

    return response.messages[ response.messages.length - 1 ].text;

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
      `)
  ])

   return response.text;
}