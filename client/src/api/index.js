import axios from "axios";

const baseUrl = "http://localhost:3001";
const postUrl = `${baseUrl}/posts`;

export const fetchPosts = () => axios.get(postUrl);
export const createPost = (post) => axios.post(postUrl, post);
export const updatePost = (id, updatePost) =>
  axios.patch(`${postUrl}/${id}`, updatePost);
export const deletePost = (id) => axios.delete(`${postUrl}/${id}`);
export const likePost = (id) => axios.patch(`${postUrl}/${id}/like`);
