import axios from "axios";

import { STORAGE_KEYS } from "../constants/storageKeys";

// const baseURL = "http://localhost:3001";
const baseURL = "https://memory-appi.herokuapp.com";
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

export const fetchPosts = () => API.get(postUrl);
export const createPost = (post) => API.post(postUrl, post);
export const updatePost = (id, updatePost) =>
  API.patch(`${postUrl}/${id}`, updatePost);
export const deletePost = (id) => API.delete(`${postUrl}/${id}`);
export const likePost = (id) => API.patch(`${postUrl}/${id}/like`);

export const signIn = (formData) => API.post(`${userUrl}/signin`, formData);
export const signUp = (formData) => API.post(`${userUrl}/signup`, formData);
