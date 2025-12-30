import axios from "axios";

const googleSearch = async (query) => {
    const res = await axios.get("https://serpapi.com/search", {
        params: {
            q: query,
            api_key: process.env.SERP_API_KEY,
        },
    });

    return res.data.organic_results.slice(0, 2);
};

export default googleSearch;
