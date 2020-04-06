import React from "react";
import { connect } from "react-redux";
import "./RecipeList.scss";
import RecipeListItem from "../RecipeListItem/RecipeListItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RecipeList(props) {
  const { recipeInfo, isLoading } = props;
  return (
    <div className="c-recipeList">
      <h2 className="sectionHeading">Recipe List:</h2>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Row>
          {recipeInfo.map((recipe, index) => {
            return (
              <Col md={{ span: 4 }} key={index}>
                <RecipeListItem
                  recipe={recipe}
                ></RecipeListItem>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}
const mapStateToProps = state => {
  return {
    recipeInfo: state.recipe
  };
};
export default connect(mapStateToProps)(RecipeList);
