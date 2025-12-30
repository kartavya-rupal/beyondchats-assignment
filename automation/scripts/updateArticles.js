import axios from "axios";
import googleSearch from "../utils/googleSearch.js";
import scrapeArticle from "../utils/scrapeArticle.js";
import llmRewrite from "../utils/llmRewrite.js";

async function run() {
    try {
        const { data: articles } = await axios.get("http://localhost:5000/api/articles");

        for (const article of articles) {
            if (article.version === "updated") continue;

            console.log(`Processing: ${article.title}`);

            const results = await googleSearch(article.title);
            const ref1 = await scrapeArticle(results[0]?.link);
            const ref2 = await scrapeArticle(results[1]?.link);

            if (!ref1 && !ref2) {
                console.log("Skipping article due to blocked references");
                continue;
            }

            const newContent = await llmRewrite(article.content, ref1, ref2);

            await axios.post("http://localhost:5000/api/articles", {
                title: article.title,
                content: newContent,
                version: "updated",
                references: [results[0].link, results[1].link],
            });

            console.log(`Updated: ${article.title}`);
        }
    } catch (error) {
        console.error("Error in worker:", error.message);
    }
}

run();
