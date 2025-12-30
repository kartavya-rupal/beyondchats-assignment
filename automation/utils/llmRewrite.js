import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});


const llmRewrite = async (original, ref1, ref2) => {
    const prompt = `
        Rewrite the original article by improving structure, headings, and flow.
        Match style and formatting of top ranking articles.
        Do not hallucinate facts.

        Original:
        ${original}

        Reference 1:
        ${ref1}

        Reference 2:
        ${ref2}
        `;

    const completion = await client.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [
            { role: "user", content: prompt }
        ],
        temperature: 0.4,
    });

    return completion.choices[0].message.content;
};

export default llmRewrite;
