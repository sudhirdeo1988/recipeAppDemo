import emptyInitialState from "../store/initialState";
import { USER_CONST } from "../utilities/constants";

export const userReducer = (state = emptyInitialState.user, action) => {
  switch (action.type) {
    case USER_CONST.ADD.USER:
      const userInfo = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        userPic: action.payload.userPic
      };
      return { ...userInfo };
    case USER_CONST.DELETE.USER:
      const pay = action.payload;
      return pay;
    default:
      return state;
  }
};
