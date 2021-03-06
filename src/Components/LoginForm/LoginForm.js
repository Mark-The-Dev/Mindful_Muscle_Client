import React, { Component } from "react";
import TokenService from "../../Services/token-service";
import AuthApiService from "../../Services/auth-api-service";
import ApiContext from "../../Contexts/ApiContext";
import "./LoginForm.css";

//Component that handles logins
class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  static contextType = ApiContext;

  state = { error: null };
  // makes sure logged in user has an auth token
  handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    const { user_name, password } = ev.target;
    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then((res) => {
        this.context.addUser(user_name.value);
        this.findUser(this.context.plans, user_name.value);
        user_name.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };
  //determines if user is valid and logged in to apply dashboard state if returning user
  // or returns false if user exercise plans don't exist (routes to exercise conditions in this case)
  findUser = (plans, userName) => {
    let track = [];
    for (let i = 0; i < plans.length; i++) {
      if (plans[i].user_id === userName && track.length === 0) {
        track.push(plans[i]);
      }
      if (track.length >= 1) {
        this.context.dashboard();
      } else if (track.length < 1) {
        this.context.dashboardB();
      }
    }
  };

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
        <div className="user_name">
          <label htmlFor="LoginForm__user_name">User name</label>
          <input required name="user_name" id="LoginForm__user_name" type='text'></input>
        </div>
        <div className="password">
          <label htmlFor="LoginForm__password">Password</label>
          <input
            required
            name="password"
            type="password"
            id="LoginForm__password"
          ></input>
        </div>
        <div className="btn">
          <button type="submit">Login</button>
        </div>

        <div role="alert">{error && <p className="red">{error}</p>}</div>
      </form>
    );
  }
}

export default LoginForm;
