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

class SignIn extends Component {
 constructor(props) {
  super(props);
  this.state = {
   user: {
    username: "",
    password: "",
   },
  };

  this.appService = new AppServices();
  this.validationService = new ValidationService();
  this.blockchainService = new BlockchainService();
 }

 setValue = (value, type) => {
  let user = this.state.user;
  user[type] = value;
  this.setState({ user });
 };

 handleUser = async () => {
  let user = this.state.user;
  console.log("User = ", user);
  let isUserNameValid = this.validationService.isValidUserName(user.username);
  let isPassValid = this.validationService.isPasswordStrong(user.password);

  if (isUserNameValid.success && isPassValid.success) {
   let userName = user.username;
   let passwordHash = this.hashIt(user.password);

   let signInAction = this.blockchainService.signInAction(
    userName,
    passwordHash,
    true
   );

   const result = await this.blockchainService.defaultPushAction(signInAction);
   console.log("Result = ", result);
   if (result.success) {
    this.props.notify("success", "Login successfully");
    // this.appService
    setTimeout(() => {
     this.props.history.push("/home");
    }, 2000);
   } else {
    this.props.notify("error", result.message);
   }
  } else {
   if (!isUserNameValid.success) {
    this.props.notify("error", isUserNameValid.message);
   } else if (!isPassValid.success) {
    this.props.notify("error", isPassValid.message);
   }
  }
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
     />

     <TextInput
      label={"Password"}
      type={"password"}
      placeholder={"Enter password"}
      setInput={this.setValue}
      valueType={"password"}
     />

     <Button label={"Continue"} onClick={this.handleUser} />
     <Link to="/signup" className="have-account-link">
      Create an account?
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

export default withRouter(SignIn);
