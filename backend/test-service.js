import { generateResponse } from "./src/services/ai.service.js";
import "dotenv/config";

async function runTest() {
    console.log("--- Starting AI Service Test ---");
    const messages = [{ role: "user", content: "What is the status of the Russia-Ukraine war today?" }];
    try {
        const result = await generateResponse(messages);
        console.log("--- Final Result ---");
        console.log("Content Preview:", result.content.substring(0, 100) + "...");
        console.log("Sources Found:", result.sources.length);
        if (result.sources.length > 0) {
            console.log("First Source:", result.sources[0].title);
        }
    } catch (error) {
        console.error("Test failed with error:", error);
    }
}

runTest();
