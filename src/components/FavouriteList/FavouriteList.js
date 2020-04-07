import React from "react";
import { connect } from "react-redux";
import "./FavouriteList.scss";

function FavouriteList(props) {
  const { favRecipe } = props;
  const count = favRecipe.length;
  return (
    <div className="c-favouriteList">
      <button className="listBtn">
        <i className="icon ts-heart-o"></i>
        <span className="itemCount">{count}</span>
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    favRecipe: state.favouriateRecipe
  };
};

export default connect(mapStateToProps)(FavouriteList);
