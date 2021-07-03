import React, { Component } from "react";
import Routing from "./routing/Routing";
import "./App.css";
import { Anchor } from "ual-anchor";
import { UALProvider, withUAL } from "ual-reactjs-renderer";

const chain = {
  chainId: process.env.REACT_APP_CHAINID,
  name: "EOS",
  rpcEndpoints: [
    {
      protocol: process.env.REACT_APP_NETWORK_PROTOCOL,
      host: process.env.REACT_APP_RPC,
      port: process.env.REACT_APP_NETWORK_PORT,
    },
  ],
};

const anchor = new Anchor([chain], {
  appName: process.env.REACT_APP_APPNAME,
  service: "https://cb.anchor.link",
});

export default class App extends Component {
  render() {
    let authenticators = [anchor];

    return (
      <UALProvider
        appName={process.env.REACT_APP_APPNAME}
        authenticators={authenticators}
        chains={[chain]}
        key={chain.chainId}
      >
        <AppConsumer />
      </UALProvider>
    );
  }
}

const AppConsumer = withUAL(Routing);
