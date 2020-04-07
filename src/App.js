import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import { connect } from "react-redux";
import { getRecipeData } from "./utilities/api.js";
import SearchPanel from "./components/SearchPanel/SearchPanel";
import RecipeList from "./components/RecipeList/RecipeList";
import RecipeItemDetails from "./components/RecipeItemDetails/RecipeItemDetails";
import { RECIPE_CONSTANTS } from "./utilities/constants";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App(props) {
  const [isLoading, setLoading] = useState(null);

  useEffect(() => {
    fetchRecipeFromAPI()
  }, []);

  async function fetchRecipeFromAPI(searchQuery) {
    setLoading(true);
    const recipeData = await getRecipeData(searchQuery);
    const newRecipeData = recipeData.map(function (el) {
      var o = Object.assign({}, el);
      o.recipe.id = uuid();
      return o.recipe;
    });
    props.addRecipe(newRecipeData);
    setLoading(false);
  }
  return (
    <div className="App">
      <SearchPanel fetchRecipeFromAPI={fetchRecipeFromAPI}></SearchPanel>

      <Container fluid>
        <Row>
          <Col md={{ span: 8 }}>
            <RecipeList isLoading={isLoading}></RecipeList>
          </Col>
          <Col md={{ span: 4 }}>
            <RecipeItemDetails></RecipeItemDetails>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    recipeInfo: state.recipe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRecipe: (payload) =>
      dispatch({ type: RECIPE_CONSTANTS.ADD.RECIPE, payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
