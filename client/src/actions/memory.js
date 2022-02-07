import * as api from "../api";
import {
  CREATE,
  DELETE,
  DONE_LOADING_POSTS,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_POST,
  FETCH_TAGS,
  START_LOADING_POSTS,
  UPDATE,
} from "../constants/actionTypes";
import { PAGES } from "../constants/routes";

// Action Creators

export const getPosts = (page) => async (dispatch) => {
  dispatch({ type: START_LOADING_POSTS });

  try {
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: { ...data } });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: DONE_LOADING_POSTS });
  }
};

export const getPost = (id) => async (dispatch) => {
  dispatch({ type: START_LOADING_POSTS });

  try {
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: { post: { ...data } } });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: DONE_LOADING_POSTS });
  }
};

export const getPostsBySearch =
  ({ search, tags }) =>
  async (dispatch) => {
    dispatch({ type: START_LOADING_POSTS });

    try {
      const { data } = await api.fetchPostsBySearch(search, tags);
      dispatch({ type: FETCH_BY_SEARCH, payload: [...data] });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: DONE_LOADING_POSTS });
    }
  };

export const getTags = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTags();

    dispatch({ type: FETCH_TAGS, payload: { ...data } });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: { ...data } });

    navigate(`${PAGES.POSTS}/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: { ...data } });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
