import React from "react";

export default class AppServices extends React.Component {
  isLogin = () => {
    let userData = localStorage.getItem("inValidIADf");
    if (userData)
      return true
    else
      return false
  }

  setUserData = (username, password) => {
    localStorage.setItem("inValidIADf", username)
    localStorage.setItem("iPasTvawod", password)
  }

  removeUserData = () => {
    localStorage.removeItem("inValidIADf")
    localStorage.removeItem("iPasTvawod")

  }

  getUserData = () => {
    let user = { username: "", password: "" }
    user.username = localStorage.getItem("inValidIADf")
    user.password = localStorage.getItem("iPasTvawod")

    return user
  }

  login = async (ual) => {
    if (ual) await ual.showModal();
  };

  logout = (ual) => {
    if (ual.activeUser) ual.logout();
  };

  getAccountName = (ual) => {
    let accountName = null;
    if (ual.activeUser != null) {
      accountName = ual.activeUser.accountName ?? null;
    }
    return accountName;
  };


}