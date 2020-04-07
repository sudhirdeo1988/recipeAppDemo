import React, { useState } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FavouriteList from '../FavouriteList/FavouriteList';
import { RECIPE_ITEM_CONSTANTS } from "../../utilities/constants";
import emptyInitialState from "../../store/initialState";
import "./SearchPanel.scss";

function SearchPanel(props) {
  const [searchQuery, setsearchQuery] = useState("");

  const getSearchQuery = (e) => {
    e.preventDefault();
    props.addRecipeItem(emptyInitialState.recipeItem);
    props.fetchRecipeFromAPI(searchQuery);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setsearchQuery(event.target.value);
  };
  return (
    <div className="c-searchPanel">
      <FavouriteList></FavouriteList>
      <Container fluid>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1 className="c-pageTitle">
              You will love recipe of our
              <span>Delicious menu</span>
            </h1>
            <form onSubmit={getSearchQuery}>
              <div className="searchPanel">
                <input
                  type="text"
                  className="txtBox"
                  name="companyName"
                  placeholder="Looking For..."
                  onChange={(e) => handleChange(e)}
                />
                <button type="submit" className="submitBtn">
                  Search
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    recipeItem: state.favouriateRecipe
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addRecipeItem: payload =>
      dispatch({ type: RECIPE_ITEM_CONSTANTS.ADD.RECIPEITEM, payload })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
