import express from "express";

import {
  getPost,
  getPosts,
  getPostsBySearch,
  createPosts,
  updatePost,
  deletePost,
  likePost,
  getTags,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", getPosts);
router.get("/tags", getTags);
router.get("/search", getPostsBySearch);
router.get("/:id", getPost);
router.post("/", auth, createPosts);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/like", auth, likePost);

export default router;
