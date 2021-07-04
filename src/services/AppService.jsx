import React from "react";

export default class AppServices extends React.Component {
  isLogin = () => {
    let userData = localStorage.getItem("inValidIADf");
    if (userData)
      return true
    else
      return false
  }

  setUserData = (username) => {
    localStorage.setItem("inValidIADf", username)
  }

  removeUserData = () => {
    localStorage.removeItem("inValidIADf")
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