import React, { Component } from "react";
import ExampleChart from '../assets/images/chart-examp.png'

export default class ParkGraph extends Component {
  render() {
    return (
      <div style={{ width: "30%", margin: "auto", marginTop: "10%" }}>
        <img src={ExampleChart} />
      </div>
    );
  }
}
