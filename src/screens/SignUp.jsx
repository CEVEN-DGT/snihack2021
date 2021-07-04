import React, { Component } from "react";
import { withRouter } from "react-router";

import AppServices from "../services/AppService";
import ValidationService from "../services/ValidationService";
import BlockchainService from "../services/BlockchainService";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        email: "",
        password: "",
        confirmPass: "",
        username: ""
      }
    }

    this.appService = new AppServices()
    this.validationService = new ValidationService()
    this.blockchainService = new BlockchainService()
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
      // setTimeout(() => {
      //   this.props.history.push('/home')
      // }, 2000);
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

  checkUserNameAvailibility = async () => {
    let userName = this.state.user.username;

    console.log("username = ", userName)
    let isUserNameValid = this.validationService.isValidUserName(userName);

    if (isUserNameValid.success) {
      // this.props.notify("success", "Valid user Name")
      let res = await this.blockchainService.getAccountInfo(userName)
      console.log("Res ", res)
    } else {
      this.props.notify("error", "invalid username")
    }


  }


  render() {
    return (
      <div style={{ width: "30%", margin: "auto", marginTop: "10%" }}>
        <h3>Sign Up</h3>

        <TextInput
          label={"User Name"}
          type={"text"}
          placeholder={"Enter EOS user name"}
          setInput={this.setValue}
          valueType={"username"}
        />

        <Button
          label={"Check availability"}
          onClick={this.checkUserNameAvailibility}
        />

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

export default withRouter(SignUp)