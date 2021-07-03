import React from "react";

export default class AppServices extends React.Component {
  isLogin = () => {
    return localStorage.getItem("UALInvalidateAt");
  };

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