import React, { Component } from "react";
import Button from "../components/Button";
import QRImage from "../assets/images/QR-Image.png"
import QrReader from 'react-qr-reader'
import { withRouter } from "react-router";


class CheckIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qrData: "",
      showQR: true
    }
  }

  showQRScanner = () => {
    this.setState({ showQR: !this.state.showQR })
  }

  handleScan = data => {
    if (data) {
      if (data === "Viktoriapark") {
        this.props.notify("success", "Welcome to " + data + " Park")
        setTimeout(() => {
          this.props.history.push('/park-info')
        }, 2000);
      }
      else {
        this.props.notify("error", "Not a Park")
      }
    }
  }

  handleError = err => {
    console.error(err)
    this.props.notify("error", err)
  }

  render() {
    return (
      <div style={{ width: "30%", margin: "auto", marginTop: "10%" }}>
        {
          this.state.showQR ?
            < img src={QRImage} style={{ width: 500, height: 500 }} />
            :
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%' }}
            />
        }

        <div style={{ marginLeft: -50 }}>
          <Button
            label={this.state.showQR == true ? "Scan QR" : "Disable QR"}
            onClick={this.showQRScanner}
            large
          />
        </div>
      </div>
    );
  }
}

export default withRouter(CheckIn)
