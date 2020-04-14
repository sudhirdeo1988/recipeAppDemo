import React, { useState } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FavouriteList from "../FavouriteList/FavouriteList";
import UserStatus from "../UserStatus/UserStatus";
import { RECIPE_ITEM_CONSTANTS } from "../../utilities/constants";
import emptyInitialState from "../../store/initialState";
import "./SearchPanel.scss";

function SearchPanel(props) {
  const { user } = props;
  const userLogin = !isEmpty(user);
  const [searchQuery, setsearchQuery] = useState("");

  const getSearchQuery = (e) => {
    e.preventDefault();
    props.addRecipeItem(emptyInitialState.recipeItem);
    props.serchQuerydata(searchQuery);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setsearchQuery(event.target.value);
  };
  const falseState = (st) => {
    props.changeState(st);
  };
  return (
    <div className="c-searchPanel">
      <FavouriteList falseState={falseState}></FavouriteList>
      {userLogin && (
        <UserStatus user={user}></UserStatus>
      )}

      <Container fluid>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1 className="c-pageTitle">
              You will love recipe of our Delicious menu
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
    recipeItem: state.favouriateRecipe,
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addRecipeItem: (payload) =>
      dispatch({ type: RECIPE_ITEM_CONSTANTS.ADD.RECIPEITEM, payload }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
