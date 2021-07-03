import React, { Component } from "react";
import Routing from "./routing/Routing.jsx";
import "./App.css";
import { Wombat } from "ual-wombat";
import { Sqrl } from "@smontero/ual-sqrl";
import { Anchor } from "ual-anchor";
import { UALProvider, withUAL } from "ual-reactjs-renderer";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';


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

const wombat = new Wombat([chain], {
  appName: process.env.REACT_APP_APPNAME,
});

const sqrl = new Sqrl([chain], {
  appName: process.env.REACT_APP_APPNAME,
});


export default class App extends Component {

  notify = (type, message) => toast[type](message);

  render() {
    let authenticators = [anchor];

    authenticators.push(wombat);
    authenticators.push(sqrl);

    return (
      <UALProvider
        appName={process.env.REACT_APP_APPNAME}
        authenticators={authenticators}
        chains={[chain]}
        key={chain.chainId}
      >
        <AppConsumer notify={this.notify} />
        <ToastContainer />
      </UALProvider>
    );
  }
}

const AppConsumer = withUAL(Routing);
