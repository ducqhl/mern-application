import { AUTH, LOGOUT } from "../constants/actionTypes";
import { STORAGE_KEYS } from "../constants/storageKeys";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      console.log(action.payload);
      localStorage.setItem(
        STORAGE_KEYS.PROFILE,
        JSON.stringify({ ...action?.payload })
      );
      return { ...state, authData: action?.payload };

    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;
