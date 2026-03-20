import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import * as zod from "zod";
import { searchInternet } from "./internet.services.js";

import { ChatMistralAI } from "@langchain/mistralai";
import { tool } from "@langchain/core/tools";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";

export const MistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY,
});


// Gemini Model
export const GeminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-3.1-flash-lite-preview",
    apiKey: process.env.GEMINI_API_KEY,
});
const searchInternetTool = tool(
    searchInternet,
    {
        name: "search_internet",
        description: "Use this tool to search the internet for information",
        schema: zod.object({
            query: zod.string().describe("The query to search the internet for"),
        }),
    }
)

const agent = createReactAgent({
    llm: GeminiModel,
    tools: [searchInternetTool],
})


export async function generateResponse(messages) {
    const response = await agent.invoke({
        messages: [
            new SystemMessage(`
                You are a helpful and precise assistant for answering questions.
                Today's date is ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}.
                Current time is ${new Date().toLocaleTimeString()}.
                If you don't know the answer, say you don't know.
                If the question requires up-to-date information, you MUST use the "search_internet" tool
                to get the latest information from the internet and then answer based on the search results.
                
                `),
            ...messages.map(msg => {
                if (msg.role === "user") {
                    return new HumanMessage(msg.content);
                } else {
                    return new AIMessage(msg.content);
                }
            })]
    });
    console.log("Agent full response messages:", JSON.stringify(response.messages.map(m => ({ 
        type: m._getType?.(), 
        contentLength: m.content?.length, 
        tool_calls: m.additional_kwargs?.tool_calls 
    })), null, 2));

    const lastMessage = response.messages[response.messages.length - 1];
    
    let sources = [];
    
    // Find tool results messages
    const searchResultMsg = response.messages.find(msg => 
        (msg.role === "tool" || msg._getType?.() === "tool" || msg.name === "search_internet") && 
        msg.content && 
        (
            (typeof msg.content === "string" && msg.content.includes('"results":')) ||
            (typeof msg.content === "object" && msg.content !== null && msg.content.results)
        )
    );

    if (searchResultMsg) {
        console.log("Found search result message!");
        try {
            let toolResult;
            if (typeof searchResultMsg.content === "string") {
                toolResult = JSON.parse(searchResultMsg.content);
            } else {
                toolResult = searchResultMsg.content;
            }

            if (toolResult && toolResult.results) {
                sources = toolResult.results.map(r => ({
                    title: r.title || "Source",
                    url: r.url || "#",
                    content: r.content || ""
                }));
                console.log(`Extracted ${sources.length} sources.`);
            }
        } catch (e) {
            console.error("Error parsing search results:", e);
        }
    } else {
        console.log("No search result tool message found in response.");
    }

    return {
        content: lastMessage.text || lastMessage.content || "No response generated",
        sources
    };
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
