import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
// https://www.restapitutorial.com/httpstatuscodes.html

export const getPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ message: "Post id is invalid" });

  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  const { page = 1 } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res
      .status(200)
      .json({ posts, page, numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { search, tags } = req.query;

  try {
    const titleRegex = new RegExp(search || null, "i");

    const posts = await PostMessage.find({
      $or: [{ title: titleRegex }, { tags: { $in: tags.split(",") } }],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);

    res.status(404).json({ message: error.message });
  }
};

export const getTags = async (req, res) => {
  try {
    const posts = await PostMessage.find();
    const tags = [...new Set(posts.map((p) => p.tags).flat())];

    res.status(200).json(tags);
  } catch (error) {
    console.error(error);

    res.status(404).json({ message: error.message });
  }
};

export const createPosts = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({ ...post, creator: req.userId });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send({ message: "Post id is invalid" });

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    },
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ message: "Post id is invalid" });

  const removedPost = await PostMessage.findByIdAndRemove(id);

  res.json(removedPost);
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req?.userId)
    return res.status(400).json({ message: "User Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send({ message: "Post id is invalid" });

  const post = await PostMessage.findById(_id);

  const index = post.likes.findIndex((userId) => userId === String(req.userId));

  if (index < 0) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((userId) => userId !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};
