import React from "react";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import isEmpty from "lodash/isEmpty";
import { Redirect } from "react-router-dom";
import { USER_CONST } from "../../utilities/constants";
import "./Login.scss";

function Login(props) {
  const responseGoogle = (response) => {
    if (!response.error && response.profileObj) {
      const info = {
        id: response.profileObj.googleId,
        name: response.profileObj.name,
        email: response.profileObj.email,
        userPic: response.profileObj.imageUrl,
      };
      props.addUser(info);
    }
  };

  const responseFacebook = (response) => {
    console.log(response);
    if (response) {
      const info = {
        id: response.id,
        name: response.name,
        email: response.email,
        userPic: response.picture.data.url,
      };
      props.addUser(info);
    }
  };

  const userLogin = !isEmpty(props.user);

  return (
    <div className="c-login">
      <div className="loginSection">
        <div className="titleSect">The Recipe</div>
        {userLogin ? (
          <Redirect to="/Recipe"></Redirect>
        ) : (
          <div className="loginBtn">
            <GoogleLogin
              clientId="771142770281-1qed04h4brfjv7c5vim8m9t57rapogtd.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              className="c-socialBtn google"
              fetchBasicProfile
            />
            <FacebookLogin
              appId="680113606139881"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="c-socialBtn facebook"
              icon="fa-facebook"
              textButton='Sign in with Facebook'
            />
          </div>
        )}
      </div>
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
    addUser: (payload) => dispatch({ type: USER_CONST.ADD.USER, payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
