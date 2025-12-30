import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import scrapeBeyondChats from "./scrapers/scraper.js";
import Article from "./models/article.js";

const seedArticles = async () => {
    await connectDB();

    const scrapedArticles = await scrapeBeyondChats();

    for (const article of scrapedArticles) {
        await Article.create({
            title: article.title,
            sourceUrl: article.sourceUrl,
            content: "",              
            version: "original",
        });
    }

    console.log("Original articles seeded", scrapedArticles); 
    process.exit();
};

seedArticles();
