
import axios from 'axios';


// https://api.spoonacular.com/recipes/search?query=pizza&apiKey=2324a025c72d47089512133d50565679
// const apiKey = 'fee756927b96423b84565bddc37aa128';
// const baseUrl = "https://api.spoonacular.com/recipes";
// https://api.edamam.com/search?q='chicken'&app_id=7b4d72d9&app_key=4ec1579c4ff720552144992599052595

const apiId = '7b4d72d9';
const apiKey = '4ec1579c4ff720552144992599052595';
const baseUrl = "https://api.edamam.com";
export const apiCall = axios.create({
  baseURL: baseUrl,
  method: 'GET'
});
export const getRecipeData = async searchKey => {
  //const recipeDataUpdate = await apiCall.get(`/search?q=${searchKey}&apiKey=${apiKey}`);
  const recipeDataUpdate = await apiCall.get(`/search?q=${searchKey}&app_id=${apiId}&app_key=${apiKey}`);
  return recipeDataUpdate.data.hits;
};

