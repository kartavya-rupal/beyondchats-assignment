import Article from "../models/article.js";

export const createArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body);
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteArticle = async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
