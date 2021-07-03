import React from "react";
import axios from "axios";

export default class ApiServices extends React.Component {
  constructor(props) {
    super(props);
  }

  //Sample get method 
  getData = async (seller) => {
    const url = "url";
    const query = "query";
    var res = null;
    await axios.get(url + query).then((response) => {
      res = response.data;
    });
    return res;
  };
}
