import React, { Component } from "react";
import { withRouter } from "react-router";
import AppServices from "../services/AppService";
import ValidationService from "../services/ValidationService";
import BlockchainService from "../services/BlockchainService";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import CoverImg from "../assets/images/Header.png";
import CryptoJs from "crypto-js";
import { Link } from "react-router-dom";

class SignUp extends Component {
 constructor(props) {
  super(props);

  this.state = {
   user: {
    email: "",
    password: "",
    confirmPass: "",
    username: "",
   },
   sync: false,
  };
 }

 handleUser = async (sync) => {
  let user = this.state.user;
  let isEamilValid = this.validationService.isEmailValid(user.email);
  let isPassValid = this.validationService.isPasswordStrong(user.password);
  let isPasswordMatched = this.validationService.isPasswordMatched(
   user.password,
   user.confirmPass
  );

  let isValidUserName = await this.checkUserNameAvailibility(sync);

  if (
   isEamilValid.success &&
   isPassValid.success &&
   isPasswordMatched.success &&
   isValidUserName.success
  ) {
   let username = user.username;
   let email = user.email;
   let passwordHash = this.hashIt(user.password);

   let signUpAction = this.blockchainService.signUpAction(
    username,
    email,
    passwordHash
   );

   const result = await this.blockchainService.defaultPushAction(signUpAction);
   console.log("Result = ", result);
   if (result.success) {
    this.props.notify("success", "Accuount created successfully");
    setTimeout(() => {
     this.props.history.push("/");
    }, 2000);
   } else {
    this.props.notify("error", result.message);
   }
  } else {
   debugger;
   if (!isValidUserName.success) {
    this.props.notify("error", isValidUserName.message);
   } else if (!sync && !isEamilValid.success) {
    this.props.notify("error", isEamilValid.message);
   } else if (!sync && !isPassValid.success) {
    this.props.notify("error", isPassValid.message);
   } else if (!sync && !isPasswordMatched.success) {
    this.props.notify("error", isPasswordMatched.message);
   }
  }
  this.setState({ sync: false });
 };

 checkUserNameAvailibility = async (sync) => {
  let isValidUserName = { success: false, message: "invalid username" };
  let userName = this.state.user.username;
  let isUserNameValid = this.validationService.isValidUserName(userName);

  if (isUserNameValid.success) {
   let res = await this.blockchainService.getAccountInfo(userName);
   if (res) {
    isValidUserName.message = "Account already exists";
   } else {
    isValidUserName.message = "Username available";
    isValidUserName.success = true;
    if (sync) this.props.notify("success", isValidUserName.message);
   }
  } else {
   isValidUserName.message = "Invalid username";
  }

  return isValidUserName;
 };

 hashIt = (password) => {
  const hashed = CryptoJs.SHA256(password).toString();
  return hashed;
 };
 render() {
  return (
   <div className="signup-main-container">
    <div className="cover-img-container">
     <img src={CoverImg} alt="cover" />
    </div>
    <div className="signup-content-contianer">
     <TextInput
      label={"User Name"}
      type={"text"}
      placeholder={"Enter EOS username"}
      setInput={this.setValue}
      valueType={"username"}
      sync={true}
      onSync={() => this.handleUser(true)}
      syncing={this.state.sync}
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

     <Button label={"Continue"} onClick={() => this.handleUser(false)} />
     <Link to="/" className="have-account-link">
      Have an account?
     </Link>
     <div className="line" />
     <button className="login-with-google-btn">
      <i className="fab fa-google-plus-g"></i>Login with google
     </button>
    </div>
   </div>
  );
 }
}

export default withRouter(SignUp);
