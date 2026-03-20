import { tavily as Tavily } from "@tavily/core";

const tavily = new Tavily({
    apiKey: process.env.TAVILY_API_KEY,
});

export async function searchInternet({ query }) {  
    console.log("Searching internet for:", query);
    try {
        const results = await tavily.search(query, {
            maxResults: 5,
            searchDepth: "advanced",
        });
        console.log("Search results received:", !!results);
        return JSON.stringify(results);
    } catch (error) {
        console.error("Tavily search error:", error);
        return JSON.stringify({ results: [] });
    }
}