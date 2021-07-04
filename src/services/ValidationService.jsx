import React from "react";

export default class ValidationService extends React.Component {

  isEmailValid = (email) => {
    let res = { success: false, message: "invalid email address" }
    if (email !== '') {
      const regx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      res.success = regx.test(String(email).toLowerCase());

      if (res.success)
        res.message = ""
    }
    return res
  }

  isPasswordStrong = (password) => {
    let res = { success: false, message: "invalid password" }
    if (password !== '') {

      if (password.length < 8) {
        res.message = "Password should be 8 character long"
      }
      else {
        res.success = true
      }

      if (res.success)
        res.message = ""
    }
    return res
  }

  isPasswordMatched = (password, confirmPass) => {
    let res = { success: false, message: "password not matched" }
    if ((password !== '' && confirmPass !== '') && (password == confirmPass)) {
      res.success = true
      res.message = ""
    }
    return res
  }


  isValidUserName = (username) => {
    let res = { success: false, message: "invalid username" }
    if (username !== '') {
      const regx = /^[a-z1-5.]{12}$/;
      res.success = regx.test(username);

      if (res.success)
        res.message = ""
    }
    return res
  }


}