import axios from "axios";
import * as cheerio from "cheerio";

async function scrapeBeyondChats() {
    const url = "https://beyondchats.com/blogs/";
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const articles = [];

    $("article.entry-card")
        .slice(-5)
        .each((_, el) => {
            const title = $(el)
                .find("h2.entry-title a")
                .text()
                .trim();

            const sourceUrl = $(el)
                .find("h2.entry-title a")
                .attr("href");

            if (!title || !sourceUrl) return;

            articles.push({
                title,
                sourceUrl,
            });
        });

    return articles;
}

export default scrapeBeyondChats;
