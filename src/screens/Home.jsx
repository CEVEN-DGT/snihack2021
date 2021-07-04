import React, { Component } from "react";
import { useHistory } from "react-router";
import Button from "../components/Button";
import CheckInImg from "../assets/images/Checkin.png";
import FindImg from "../assets/images/Find.png";
import ParkProfileImg from "../assets/images/Parkprofiles.png";
import Contribute from "../assets/images/Contribute.png";
import HomeContentTab from "../components/HomeContentTab";

export default function Home(props) {
 const history = useHistory();

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

 return (
  <div className="signup-main-container home-main-container">
   <button className="home-logout-btn">Logout</button>
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
