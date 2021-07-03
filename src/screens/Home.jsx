import React, { Component } from "react";
import { useHistory } from "react-router";
import Button from "../components/Button";

export default function Home(props) {

  const history = useHistory()

  const moveToCheckIn = () => {
    history.push("/checkin")
  }

  const moveToFindPark = () => {
    props.notify("warning", "Comming soon")
  }

  const moveToParkProfiles = () => {
    props.notify("warning", "Comming soon")
  }

  const moveToContribute = () => {
    props.notify("warning", "Comming soon")
  }


  return (
    <div style={{ width: "30%", margin: "auto", marginTop: "10%" }}>

      <Button
        label={"Checkin"}
        onClick={moveToCheckIn}
        large
      />

      <Button
        label={"Find a Park"}
        onClick={moveToFindPark}
        large
      />

      <Button
        label={"Park Profiles"}
        onClick={moveToParkProfiles}
        large
      />

      <Button
        label={"Contribute"}
        onClick={moveToContribute}
        large
      />

    </div>
  );
}
