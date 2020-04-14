import emptyInitialState from "../store/initialState";
import { RECIPE_ITEM_CONSTANTS } from "../utilities/constants";

export const recipeItemReducer = (
  state = emptyInitialState.recipeItem,
  action
) => {
  switch (action.type) {
    case RECIPE_ITEM_CONSTANTS.ADD.RECIPEITEM:
      const recipeItemInfo = action.payload;
      return recipeItemInfo;
      case RECIPE_ITEM_CONSTANTS.EMPTY.RECIPEITEM:
        return action.payload;
    default:
      return state;
  }
};
