import emptyInitialState from "../store/initialState";
import { RECIPE_CONSTANTS } from "../utilities/constants";

export const recipeReducer = (state = emptyInitialState.recipe, action) => {
  switch (action.type) {
    case RECIPE_CONSTANTS.ADD.RECIPE:
      const recipeInfo = [
        ...action.payload
      ];
      return recipeInfo;
    default:
      return state;
  }
};
