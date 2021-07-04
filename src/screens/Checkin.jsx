import React, { Component } from "react";
import Button from "../components/Button";
import QRImage from "../assets/images/QR-Image.png";
import QrReader from "react-qr-reader";
import { withRouter } from "react-router";

class CheckIn extends Component {
 constructor(props) {
  super(props);

  this.state = {
   qrData: "",
   showQR: true,
  };
 }

 showQRScanner = () => {
  this.setState({ showQR: !this.state.showQR });
 };

 handleScan = (data) => {
  if (data) {
   if (data === "Viktoriapark") {
    this.props.notify("success", "Welcome to " + data + " Park");
    setTimeout(() => {
     this.props.history.push("/park-info");
    }, 2000);
   } else {
    this.props.notify("error", "Not a Park");
   }
  }
 };

 handleError = (err) => {
  console.error(err);
  this.props.notify("error", err);
 };

 render() {
  return (
   <div className="signup-main-container qr-checkin-main-container">
    {this.state.showQR ? (
     <div className="checkin-qr-img-container">
      <img src={QRImage} />
     </div>
    ) : (
     <div className="checkin-qr-img-container">
      <QrReader
       delay={300}
       onError={this.handleError}
       onScan={this.handleScan}
       className="qr-reader"
      />
     </div>
    )}

    <div className="qr-btn-container">
     <button onClick={this.skipBtnHandler}>Skip</button>
     <button onClick={this.showQRScanner}>
      {this.state.showQR == true ? "Scan QR" : "Disable QR"}
     </button>
    </div>
   </div>
  );
 }
}

export default withRouter(CheckIn);
