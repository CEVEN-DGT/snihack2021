import React from "react";
import { Api, JsonRpc, RpcError } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";

const chainId = process.env.REACT_APP_CHAINID;
const signatureProvider = new JsSignatureProvider([]);
const rpcUrl =
  process.env.REACT_APP_NETWORK_PROTOCOL +
  "://" +
  process.env.REACT_APP_RPC +
  ":" +
  process.env.REACT_APP_NETWORK_PORT;
const rpc = new JsonRpc(rpcUrl, { fetch });
const api = new Api({ rpc, signatureProvider, chainId });
const tokenSymbol = process.env.REACT_APP_TOKEN_PRECISION +
  "," +
  process.env.REACT_APP_TOKEN_SYMBOL;

export default class BlockchainService extends React.Component {
  constructor(props) {
    super(props);

    this.eosioTokenContract = "eosio.token";
    this.tokenSymbol =
      process.env.REACT_APP_TOKEN_PRECISION +
      "," +
      process.env.REACT_APP_TOKEN_SYMBOL;
  }

  getAccountInfo = async (accontName) => {
    let res = null;
    try {
      res = await rpc.get_account(accontName);
    } catch (err) {
      res = null;
    }
    return res;
  };

  getUserBalance = async (userName) => {
    var res = await rpc.get_currency_balance(
      "eosio.token",
      userName,
      tokenSymbol
    );
    if (res) {
      res = res.toString();
      return res.substr(0, res.indexOf(".") + 3);
    }
    return 0;
  };

  getAuthorization = (actor, permission) => {
    return { actor, permission };
  };

  getAction = (contractName, actonName, data, authorization) => {
    return {
      actions: [
        {
          account: contractName,
          name: actonName,
          authorization,
          data,
        },
      ],
    };
  };

  pushTransaction = async (trx, ual) => {
    let res = {
      success: false,
      message: "",
    };
    try {
      const result = await ual.activeUser.signTransaction(trx, {
        blocksBehind: 12,
        expireSeconds: 120,
        broadcast: true,
        sign: true,
      });

      res.message = result;
      res.success = true;
    } catch (e) {
      if (e.message.toString().includes("balance"))
        res.message = "Kindly buy more " + tokenSymbol + " for the transaction";
      else if (e.message.toString().includes("CPU"))
        res.message = "Kindly stake more CPU for the transaction";
      else if (e.message.toString().includes("net0"))
        res.message = "Kindly stake more NET for the transaction";
      else res.message = e.message;

      res.success = false;
    }

    return res;
  };

  defaultPushAction = async (trx) => {
    let res = {
      success: false,
      message: "",
    };

    try {
      const result = await this.api.transact(trx, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
      res.message = result;
      res.success = true;
    } catch (e) {
      res.success = false;
      res.message = "Transaction Faild";
      if (e.json) {
        var errorJson = e.json.error.details[0].message;
        if (e instanceof RpcError) res.message = errorJson;
      }
    }

    return res;
  };

  transferToken = (from, to, quantity, memo) => {
    let contract = this.eosioTokenContract;
    let actionName = "transfer";
    let authorization = this.getAuthorization(from, "active");

    let data = {
      from,
      to,
      quantity,
      memo,
    };

    let action = this.getAction(contract, actionName, data, [authorization]);
    return action;
  };

  getTransactionDetails = async (trxId) => {
    let res = null;
    try {
      let transactDetails = await rpc.history_get_transaction(trxId);
      res = transactDetails;
    } catch (err) {
      console.log("Error ", err);
      res = null;
    }
    return res;
  };
}
