import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import {
  USER_CONST,
  RECIPE_CONSTANTS,
  RECIPE_ITEM_CONSTANTS,
  FAV_RECIPES,
} from "../../utilities/constants";
import "./UserStatus.scss";

function UserStatus(props) {
  const { user } = props;
  const setLogout = () => {
    props.removeUser({});
    props.emptyRecipeItem({});
    props.removeRecipe([]);
    props.emptyFavRecipeItem([]);
  };
  return (
    <div className="c-userStatus">
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" className="listBtn">
          <img src={user.userPic} alt="" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <div className="userInfo">
            <div className="userPic">
              <img src={user.userPic} alt="" />
            </div>
            <span className="userName">{user.name}</span>
          </div>
          <Dropdown.Item as="button" onSelect={setLogout}>
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: (payload) =>
      dispatch({ type: USER_CONST.DELETE.USER, payload }),
    removeRecipe: (payload) =>
      dispatch({ type: RECIPE_CONSTANTS.REMOVE.RECIPE, payload }),
    emptyRecipeItem: (payload) =>
      dispatch({ type: RECIPE_ITEM_CONSTANTS.EMPTY.RECIPEITEM, payload }),
    emptyFavRecipeItem: (payload) =>
      dispatch({ type: FAV_RECIPES.EMPTY.RECIPEITEM, payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserStatus);
