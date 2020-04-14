import emptyInitialState from "../store/initialState";
import { FAV_RECIPES } from "../utilities/constants";

export const favouriateRecipe = (state = emptyInitialState.favouriateRecipe, action) => {
  switch (action.type) {
    case FAV_RECIPES.ADD.RECIPEITEM:
      const recipeInfo =  {...action.payload};
      return [...state,recipeInfo];
      case FAV_RECIPES.REMOVE.RECIPEITEM:
        const favRecipeItem = action.payload;
        const updatedList = state.filter(item => item.id !== favRecipeItem.id)
        return [...updatedList];
        case FAV_RECIPES.EMPTY.RECIPEITEM:
          return action.payload;
    default:
      return state;
  }
};
