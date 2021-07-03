import React, { Component } from "react";
import { withRouter } from "react-router";

import AppServices from "../services/AppService";
import ValidationService from "../services/ValidationService";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

class SignIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        email: "",
        password: "",
        confirmPass: ""
      }
    }

    this.appService = new AppServices()
    this.validationService = new ValidationService()
  }


  setValue = (value, type) => {
    let user = this.state.user;
    user[type] = value;
    this.setState({ user })
  }


  handleUser = () => {

    let user = this.state.user
    debugger;
    console.log("User = ", user)
    let isEamilValid = this.validationService.isEmailValid(user.email)
    let isPassValid = this.validationService.isPasswordStrong(user.password)
    let isPasswordMatched = this.validationService.isPasswordMatched(user.password, user.confirmPass)

    if (isEamilValid.success && isPassValid.success && isPasswordMatched.success) {
      this.props.notify("success", "Login successfully")
      setTimeout(() => {
        this.props.history.push('/home')
      }, 2000);
    } else {
      if (!isEamilValid.success) {
        this.props.notify("error", isEamilValid.message)
      }
      else if (!isPassValid.success) {
        this.props.notify("error", isPassValid.message)
      }
      else if (!isPasswordMatched.success) {
        this.props.notify("error", isPasswordMatched.message)
      }
    }

  }


  render() {
    return (
      <div style={{ width: "30%", margin: "auto", marginTop: "10%" }}>
        <h3>Sign Up</h3>

        <TextInput
          label={"Email"}
          type={"email"}
          placeholder={"Enter email"}
          setInput={this.setValue}
          valueType={"email"}
        />

        <TextInput
          label={"Password"}
          type={"password"}
          placeholder={"Enter password"}
          setInput={this.setValue}
          valueType={"password"}

        />

        <TextInput
          label={"Confirm Password"}
          type={"password"}
          placeholder={"Enter password"}
          setInput={this.setValue}
          valueType={"confirmPass"}

        />

        <Button
          label={"Continue"}
          onClick={this.handleUser}
        />
      </div>
    );
  }
}

export default withRouter(SignIn)