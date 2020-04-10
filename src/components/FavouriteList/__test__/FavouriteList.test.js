import React from "react";
import { render, cleanup } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import FavouriteList from "../FavouriteList";

afterEach(cleanup);
describe("Favourite List Componets", () => {
  test("should render correctly", () => {
    const initialState = {
      favouriateRecipe: [
        {
          uri:
            "http://www.edamam.com/ontologies/edamam.owl#recipe_09be6cc615db3ab88b48dadc30726fed",
          label: "All-Butter Pie Crust",
          image:
            "https://www.edamam.com/web-img/b50/b5031e0c62073138c6b2f878430337f7.JPG",
          source: "Food52",
          url: "https://food52.com/recipes/6718-all-butter-pie-crust",
          shareAs:
            "http://www.edamam.com/recipe/all-butter-pie-crust-09be6cc615db3ab88b48dadc30726fed/all",
          yield: 2,
          calories: 2651.34,
          totalWeight: 645.0861952394988,
          totalTime: 62,
          id: "4cc6e30-effb-5d6b-8b61-8d8f5b54e525",
        }
      ],
    };
    const mockStore = configureMockStore([thunkMiddleware]);
    const store = mockStore(initialState);

    const { container } = render(
      <Provider store={store}>
        <FavouriteList />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
