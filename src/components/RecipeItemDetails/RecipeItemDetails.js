import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FAV_RECIPES } from "../../utilities/constants";
import { checkInFav } from "../../utilities/utilityFunctions";
import "./RecipeItemDetails.scss";

function RecipeItemDetails(props) {
  const { recipeDtls, favRecipe, changeState } = props;
  const [addedToFav, setaddedToFav] = useState(false);
  const [pulse, setpulse] = useState(false);

  useEffect(() => {
    setaddedToFav(changeState);
    const checkaddToFav = async (recipeDtls) => {
      const checkFavStatus = await checkInFav(favRecipe, recipeDtls);
      setaddedToFav(checkFavStatus);
    };
    checkaddToFav(recipeDtls);
  }, [addedToFav, recipeDtls, changeState, favRecipe]);
  let peopleArray = [];
  if (recipeDtls && recipeDtls.totalNutrients) {
    peopleArray = Object.values(recipeDtls.totalNutrients);
  }

  const addToFav = async (dtls) => {
    setpulse(true);
    const checkFav = await checkInFav(favRecipe, recipeDtls);
    if (!checkFav) {
      props.addToFavRecipe(dtls);
      setaddedToFav(true);
    } else {
      props.removeFromFavRecipe(dtls);
      setaddedToFav(false);
    }
    const timer = setTimeout(() => {
      setpulse(false);
    }, 500);
    return () => clearTimeout(timer);
  };
  return (
    <div className="c-recipeItemDetails">
      <h2 className="sectionHeading">Recipe Details</h2>

      {recipeDtls && JSON.stringify(recipeDtls) !== "{}" && (
        <div className="r_info">
          <h2 className="r_name">
            {recipeDtls.label}
            <button
              id="btnAdd"
              className={`btnAdd ${pulse ? "st-pulse" : ""} ${
                addedToFav ? "st-active" : ""
              }`}
              onClick={() => addToFav(recipeDtls)}
            ></button>
          </h2>

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
                  {recipeDtls.ingredients.map((ingredient, index) => {
                    return (
                      <li key={index}>
                        <span className="info">{ingredient.text}</span>
                        <span className="calInfo">
                          {ingredient.weight.toFixed(1)} g
                        </span>
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
                  {peopleArray.map((nutrient, index) => {
                    return (
                      <li key={index}>
                        <div className="infoSect">
                          <label>{nutrient.label}</label>
                          <span>
                            {nutrient.quantity.toFixed(1)}&nbsp;{nutrient.unit}
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
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    recipeDtls: state.recipeItem,
    favRecipe: state.favouriateRecipe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToFavRecipe: (payload) =>
      dispatch({ type: FAV_RECIPES.ADD.RECIPEITEM, payload }),
    removeFromFavRecipe: (payload) =>
      dispatch({ type: FAV_RECIPES.REMOVE.RECIPEITEM, payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeItemDetails);
