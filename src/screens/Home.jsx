import React, { Component } from "react";
import { useHistory } from "react-router";
import Button from "../components/Button";
import CheckInImg from "../assets/images/Checkin.png";
import FindImg from "../assets/images/Find.png";
import ParkProfileImg from "../assets/images/Parkprofiles.png";
import Contribute from "../assets/images/Contribute.png";
import HomeContentTab from "../components/HomeContentTab";
import AppServices from "../services/AppService";
import BlockchainService from "../services/BlockchainService";
import CryptoJs from "crypto-js";


export default function Home(props) {
    const history = useHistory();
    const appService = new AppServices()
    const blockchainService = new BlockchainService()


    const moveToCheckIn = () => {
        history.push("/checkin");
    };

    const moveToFindPark = () => {
        props.notify("warning", "Comming soon");
    };

    const moveToParkProfiles = () => {
        props.notify("warning", "Comming soon");
    };

    const moveToContribute = () => {
        props.notify("warning", "Comming soon");
    };

    const logoutUser = async () => {
        let user = appService.getUserData()
        let passwordHash = hashIt(user.password)
        let signInAction = blockchainService.signInAction(
            user.username,
            passwordHash,
            false
        );
        debugger

        const result = await blockchainService.defaultPushAction(signInAction);
        console.log("Result = ", result);
        if (result.success) {
            props.notify("success", "Logout Successfully");
            appService.removeUserData()
            setTimeout(() => {
                history.push("/");
            }, 1000);
        } else {
            props.notify("error", result.message);
        }

    }

    const hashIt = (password) => {
        const hashed = CryptoJs.SHA256(password).toString();
        return hashed;
    };


    return (
        <div className="signup-main-container home-main-container">
            <button className="home-logout-btn" onClick={logoutUser}>Logout</button>
            <HomeContentTab
                title="Checkin"
                img={CheckInImg}
                onClick={moveToCheckIn}
                background="#fff"
            />
            <HomeContentTab
                title="Find a Park"
                img={FindImg}
                onClick={moveToFindPark}
                background="#D1EEE8"
            />
            <HomeContentTab
                title="Park Profiles"
                img={ParkProfileImg}
                onClick={moveToParkProfiles}
                background="#B1E6DB"
            />
            <HomeContentTab
                title="Contribute"
                img={Contribute}
                onClick={moveToContribute}
                background="#99D8CB"
            />
        </div>
    );
}
