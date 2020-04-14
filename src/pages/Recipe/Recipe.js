import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import debounce from "lodash.debounce";
import { getRecipeData } from "../../utilities/api";
import SearchPanel from "../../components/SearchPanel/SearchPanel";
import RecipeList from "../../components/RecipeList/RecipeList";
import RecipeItemDetails from "../../components/RecipeItemDetails/RecipeItemDetails";
import { RECIPE_CONSTANTS } from "../../utilities/constants";

function Recipe(props) {
  const [isLoading, setLoading] = useState(null);
  const [favState, setfavState] = useState(null);
  const [searchQ, setsearchQ] = useState("");
  const [pageFrom, setpageFrom] = useState(0);
  const [pageTo, setpageTo] = useState(10);

  window.onscroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setpageFrom(pageFrom + 10);
      setpageTo(pageTo + 10);
    }
  }, 1000);

  const serchQuerydata = (searchQuery) => {
    setsearchQ(searchQuery);
    props.removeRecipe([]);
    fetchRecipeFromAPI(searchQuery, pageFrom, pageTo);
  };

  useEffect(() => {
    if (pageTo - pageFrom === 10) {
      fetchRecipeFromAPI(searchQ, pageFrom, pageTo);
    }
  }, [pageFrom, pageTo]);

  async function fetchRecipeFromAPI(searchQuery, pageFrom, pageTo) {
    setLoading(true);
    const recipeData = await getRecipeData(searchQuery, pageFrom, pageTo);
    props.addRecipe(recipeData);
    setLoading(false);
  }
  const changeState = (st) => {
    setfavState(st);
    return st;
  };
  return (
    <div className="App">
      <Helmet>
        <title>Recipe App Demo</title>
      </Helmet>
      <SearchPanel
        changeState={changeState}
        serchQuerydata={serchQuerydata}
      ></SearchPanel>

      <Container fluid>
        <Row>
          <Col md={{ span: 8 }}>
            <RecipeList isLoading={isLoading}></RecipeList>
          </Col>
          <Col md={{ span: 4 }}>
            <RecipeItemDetails changeState={favState}></RecipeItemDetails>
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
    removeRecipe: (payload) =>
      dispatch({ type: RECIPE_CONSTANTS.REMOVE.RECIPE, payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
