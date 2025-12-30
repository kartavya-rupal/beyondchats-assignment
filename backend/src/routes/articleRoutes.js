import express from "express";
import * as controller from "../controllers/articleController.js";

const router = express.Router();

router.post("/", controller.createArticle);
router.get("/", controller.getArticles);
router.get("/:id", controller.getArticle);
router.put("/:id", controller.updateArticle);
router.delete("/:id", controller.deleteArticle);

export default router;
