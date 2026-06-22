import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {ChatMistralAI} from "@langchain/mistralai"
import {AIMessage, HumanMessage ,SystemMessage} from "langchain"

const gemniModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMNI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
})

export async function generateResponse(message) {
  
   const response = await gemniModel.invoke(message.map(msg=>{
    if(msg.role=="user"){
      return new HumanMessage(msg.content)
    }else if(msg.role =="ai"){
      return new AIMessage(msg.content)
    }
   }))
  
   return response.text

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