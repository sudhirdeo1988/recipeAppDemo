import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import debounce from "lodash.debounce";
import loadable from "@loadable/component";
import { getRecipeData } from "../../utilities/api";
import { RECIPE_CONSTANTS } from "../../utilities/constants";

const SearchPanel = loadable(() =>
  import("../../components/SearchPanel/SearchPanel")
);
const RecipeList = loadable(() =>
  import("../../components/RecipeList/RecipeList")
);
const RecipeItemDetails = loadable(() =>
  import("../../components/RecipeItemDetails/RecipeItemDetails")
);

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
    setpageFrom(0);
    setpageTo(10);
    props.removeRecipe([]);
  };
  const fetchRecipeFromAPI = useCallback(
    async (searchQuery, pageFrom, pageTo) => {
      setLoading(true);
      const recipeData = await getRecipeData(searchQuery, pageFrom, pageTo);
      props.addRecipe(recipeData);
      setLoading(false);
    },
    [props]
  );
  useEffect(() => {
    if (pageTo - pageFrom === 10) {
      fetchRecipeFromAPI(searchQ, pageFrom, pageTo);
    }
  }, [pageFrom, pageTo, searchQ]);

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
