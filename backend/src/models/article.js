import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    sourceUrl: String,
    version: {
        type: String,
        enum: ["original", "updated"],
        default: "original",
    },
    references: [String],
}, { timestamps: true });

export default mongoose.model("Article", articleSchema);
