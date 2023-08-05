import axios from "axios";

import { QUERY_KEYS } from "../constants/queryKeys";
import { STORAGE_KEYS } from "../constants/storageKeys";

// const baseURL = "http://localhost:3001";
const baseURL = "https://mearn-server.onrender.com";
const postUrl = `/posts`;
const userUrl = `/user`;
const API = axios.create({ baseURL });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem(STORAGE_KEYS.PROFILE);
  if (profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`${postUrl}/${id}`);
export const fetchPosts = (page) =>
  API.get(`${postUrl}?${QUERY_KEYS.PAGE}=${page}`);
export const fetchTags = () => API.get(`${postUrl}/tags`);
export const fetchPostsBySearch = (search, tags) =>
  API.get(
    `${postUrl}/search?${QUERY_KEYS.SEARCH}=${search}&${QUERY_KEYS.TAGS}=${tags}  `
  );
export const createPost = (post) => API.post(postUrl, post);
export const updatePost = (id, updatePost) =>
  API.patch(`${postUrl}/${id}`, updatePost);
export const deletePost = (id) => API.delete(`${postUrl}/${id}`);
export const likePost = (id) => API.patch(`${postUrl}/${id}/like`);

export const signIn = (formData) => API.post(`${userUrl}/signin`, formData);
export const signUp = (formData) => API.post(`${userUrl}/signup`, formData);
