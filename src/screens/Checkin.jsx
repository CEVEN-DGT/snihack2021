import React, { Component } from "react";
import Button from "../components/Button";
import QRImage from "../assets/images/QR-Image.png";
import QrReader from "react-qr-reader";
import BlockchainService from "../services/BlockchainService";
import AppServices from "../services/AppService";
import { withRouter } from "react-router";

class CheckIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            qrData: "",
            showQR: true,
        };

        this.appService = new AppServices();
        this.blockchainService = new BlockchainService();
    }

    showQRScanner = () => {
        this.setState({ showQR: !this.state.showQR });
    };

    handleScan = async (data) => {
        if (data) {
            if (data === "17000000001625384306") {


                let user = this.appService.getUserData()
                let parkEntryAction = this.blockchainService.enteryExitParkAction(
                    user.username,
                    data,
                    true
                );

                debugger;
                const result = await this.blockchainService.defaultPushAction(parkEntryAction);
                if (result.success) {
                    this.props.notify("success", "Welcome to Viktoriapark Park");
                    setTimeout(() => {
                        this.props.history.push("/park-info");
                    }, 2000);
                } else {
                    this.props.notify("error", result.message);
                }


            } else {
                this.props.notify("error", "Park not registered");
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
