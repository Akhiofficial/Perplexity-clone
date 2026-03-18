import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import { ChatMistralAI } from "@langchain/mistralai";


export const MistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY,
});


// Gemini Model
export const GeminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-3.1-flash-lite-preview",
    apiKey: process.env.GEMINI_API_KEY,
});



export async function generateResponse(messages) {
    const response = await GeminiModel.invoke(messages.map(msg => {
        if(msg.role === "user") {
            return new HumanMessage(msg.content);
        } else {
            return new AIMessage(msg.content);
        }
    }));
    return response.text;
}


// generate chat title using mistral model
export async function generateChatTitle(message) {
    const response = await MistralModel.invoke([
        new SystemMessage(`You are an expert at summarizing conversations into short, engaging titles.`),
        new HumanMessage(`Create a concise 3-to-5 word title for a chat that starts with this message: "${message}". 
            Return ONLY the title text. No quotes, no periods, and no introductory phrases.`)
    ]);

    return response.text;
}
