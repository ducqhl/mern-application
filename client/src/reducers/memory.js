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

const postReducer = (
  state = { posts: [], tags: [], isLoadingPosts: true, post: null },
  action
) => {
  switch (action.type) {
    case START_LOADING_POSTS:
      return { ...state, isLoadingPosts: true };

    case DONE_LOADING_POSTS:
      return { ...state, isLoadingPosts: false };

    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.posts,
        page: action.payload.page,
        numberOfPages: action.payload.numberOfPages,
      };

    case FETCH_POST:
      return { ...state, post: action.payload.post };

    case FETCH_TAGS:
      return { ...state, tags: action.payload };

    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };

    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };

    case UPDATE:
      const newPosts = state.posts.map((p) =>
        p._id === action.payload._id ? action.payload : p
      );

      return { ...state, posts: newPosts };

    case DELETE:
      const newPost = state.posts.filter((p) => p._id !== action.payload);
      return { ...state, posts: newPost };

    default:
      return state;
  }
};

export default postReducer;
