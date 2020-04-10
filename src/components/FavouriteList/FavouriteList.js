import React, { useState } from "react";
import { connect } from "react-redux";
import { FAV_RECIPES } from "../../utilities/constants";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./FavouriteList.scss";

function FavouriteList(props) {
  const { favRecipe } = props;
  const [show, setShow] = useState(false);

  const removeItem = (item) => {
    props.removeFromFavRecipe(item);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const count = favRecipe.length;

  return (
    <div className="c-favouriteList">
      <button className="listBtn" onClick={handleShow}>
        <i className="icon ts-heart-o"></i>
        <span className="itemCount">{count}</span>
      </button>

      <Modal show={show} onHide={() => handleClose()} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="clearfix">
            {!count ? (
              <span>No records</span>
            ) : (
              favRecipe.map((recipe) => {
                return (
                  <div className="recipeFavList" key={recipe.id}>
                    <img
                      className="img"
                      src={recipe.image}
                      alt={recipe.label}
                    />
                    <button
                      type="button"
                      className="remoceBtn"
                      onClick={() => removeItem(recipe)}
                    ></button>
                    <div className="recipeTitle">{recipe.label}</div>
                    <div className="recipeInfo">
                      <Row>
                        <Col xs={{ span: 6 }}>
                          <label>Calories: </label>
                          <span>{recipe.calories.toFixed(2)}&nbsp;kcal</span>
                        </Col>
                        <Col xs={{ span: 6 }}>
                          <label>Total Weight: </label>
                          <span>{recipe.totalWeight.toFixed(2)}&nbsp;g</span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    favRecipe: state.favouriateRecipe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromFavRecipe: (payload) =>
      dispatch({ type: FAV_RECIPES.REMOVE.RECIPEITEM, payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteList);
