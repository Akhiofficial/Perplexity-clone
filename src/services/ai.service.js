import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});


export async function test() {
    const response = await model.invoke("What is ai? writw in 10word").then((response) => {
        console.log(response.text);
    })

}

