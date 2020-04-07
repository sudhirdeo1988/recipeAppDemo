import React, { useState } from "react";
import { connect } from "react-redux";
import "./RecipeListItem.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { RECIPE_ITEM_CONSTANTS } from "../../utilities/constants";
import { checkFoodType } from "../../utilities/utilityFunctions";

function RecipeListItem(recipe) {
  console.log(recipe.onActive);
  const showDetails = (recipeData) => {
    recipe.addRecipeItem(recipeData);
    recipe.onSelected(recipeData.id);
  };

  const foodType = checkFoodType(recipe.recipe && recipe.recipe.healthLabels);
  return (
    <div className={`c-recipeListItem ${recipe.onActive ? "st-active" : ""}`}>
      <div className="recipeImage">
        {foodType ? (
          <div className="recipeType veg"></div>
        ) : (
          <div className="recipeType nveg"></div>
        )}
        <img src={recipe.recipe.image} alt={recipe.recipe.label} />
      </div>
      <div className="recipeTitle">{recipe.recipe.label}</div>
      <div className="recipeBy">By: {recipe.recipe.source}</div>
      <div className="recipeInfo">
        <Row>
          <Col xs={{ span: 6 }}>
            <label>Calories: </label>
            <span>{recipe.recipe.calories.toFixed(2)}&nbsp;kcal</span>
          </Col>
          <Col xs={{ span: 6 }}>
            <label>Total Weight: </label>
            <span>{recipe.recipe.totalWeight.toFixed(2)}&nbsp;g</span>
          </Col>
        </Row>
      </div>
      <div className="recipeBtn">
        <button className="btnLarge" onClick={() => showDetails(recipe.recipe)}>
          Show Details
        </button>
      </div>
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
    addRecipeItem: (payload) =>
      dispatch({ type: RECIPE_ITEM_CONSTANTS.ADD.RECIPEITEM, payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListItem);
