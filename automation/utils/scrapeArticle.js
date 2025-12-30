import axios from "axios";
import * as cheerio from "cheerio";

const scrapeArticle = async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let text = "";
        $("p").each((_, el) => {
            text += $(el).text() + "\n";
        });

        return text;
    } catch (error) {
        console.error(`Failed to scrape ${url}:`, error.message);
        return ""; 
    }
};

export default scrapeArticle;
