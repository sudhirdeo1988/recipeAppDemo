import React, {useState} from "react";
import { connect } from "react-redux";
import "./RecipeList.scss";
import RecipeListItem from "../RecipeListItem/RecipeListItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RecipeList(props) {
  const [selectId, setselectId] = useState('')
  const { recipeInfo, isLoading } = props;
  const onSelected = id => {
    setselectId(id);
  }
  return (
    <div className="c-recipeList">
      <h2 className="sectionHeading">Recipe List:</h2>
        <Row>
          {recipeInfo.map((recipe, index) => {
            return (
              <Col md={{ span: 4 }} key={index}>
                <RecipeListItem
                  recipe={recipe}
                  onSelected={onSelected}
                  onActive = {recipe.id === selectId}
                ></RecipeListItem>
              </Col>
            );
          })}
        </Row>
        {isLoading && <div className="c-loading"></div>}
    </div>
  );
}
const mapStateToProps = state => {
  return {
    recipeInfo: state.recipe
  };
};
export default connect(mapStateToProps)(RecipeList);
