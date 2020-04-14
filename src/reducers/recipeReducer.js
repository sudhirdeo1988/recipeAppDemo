import emptyInitialState from "../store/initialState";
import { RECIPE_CONSTANTS } from "../utilities/constants";

export const recipeReducer = (state = emptyInitialState.recipe, action) => {
  switch (action.type) {
    case RECIPE_CONSTANTS.ADD.RECIPE:
      const recipeInfo = [
        ...state,
        ...action.payload
      ];
      return recipeInfo;
      case RECIPE_CONSTANTS.REMOVE.RECIPE:
        const removerecipeInfo = action.payload;
        return removerecipeInfo;
    default:
      return state;
  }
};
