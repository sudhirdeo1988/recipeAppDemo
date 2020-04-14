import { createStore, combineReducers } from "redux";
import { recipeReducer } from "../reducers/recipeReducer";
import { recipeItemReducer } from "../reducers/recipeItemReducer";
import { favouriateRecipe } from "../reducers/favouriateRecipe";
import {userReducer} from "../reducers/userReducer";

// import emptyInitialState from "./initialState";
const rootReducer = combineReducers({
  recipe: recipeReducer,
  recipeItem: recipeItemReducer,
  favouriateRecipe: favouriateRecipe,
  user: userReducer
});

export default () => {
  let store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return { store }
}
