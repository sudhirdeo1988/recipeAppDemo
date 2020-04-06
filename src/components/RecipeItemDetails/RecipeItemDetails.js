import React from "react";
import { connect } from "react-redux";
import "./RecipeItemDetails.scss";

function RecipeItemDetails(props) {
  const { recipeDtls } = props;
  let peopleArray = [];
  if (recipeDtls && recipeDtls.totalNutrients) {
    peopleArray = Object.values(recipeDtls.totalNutrients);
  }
  return (
    <div className="c-recipeItemDetails">
      <h2 className="sectionHeading">Recipe Details</h2>
      <span>{recipeDtls.label}</span>
      <div className="r_info">
        <h2 className="r_name">{recipeDtls.label}</h2>

        {recipeDtls && recipeDtls.healthLabels && (
          <div className="r_section">
            <label className="s_label">Health Label</label>
            <div className="s_block healthLbl">
              <ul>
                {recipeDtls.healthLabels.map((label, index) => {
                  return <li key={index}>{label}</li>;
                })}
              </ul>
            </div>
          </div>
        )}

        {recipeDtls && recipeDtls.ingredients && (
          <div className="r_section">
            <label className="s_label">Ingredients</label>
            <div className="s_block healthLbl type-02">
              <ul>
                {recipeDtls.ingredients.map((ingredient) => {
                  return (
                    <li>
                      <span className="info">{ingredient.text}</span>
                      <span className="calInfo">{ingredient.weight} g</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        {recipeDtls && recipeDtls.totalNutrients && peopleArray && (
          <div className="r_section">
            <label className="s_label">Nutrients Information</label>
            <div className="s_block healthLbl type-03">
              <ul>
                {peopleArray.map((nutrient) => {
                  return (
                    <li>
                      <div className="infoSect">
                        <label>{nutrient.label}</label>
                        <span>
                          {nutrient.quantity}&nbsp;{nutrient.unit}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    recipeDtls: state.recipeItem,
  };
};
export default connect(mapStateToProps)(RecipeItemDetails);
