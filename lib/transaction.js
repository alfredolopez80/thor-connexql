"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRawTransaction = void 0;
exports.sendRawTransaction = (connex) => async (payload) => {
    const Web3 = require('web3');
    const { thorify } = require('thorify');
    const thor = thorify(new Web3(), process.env.THOR_URL);
    const res = await thor.eth.sendSignedTransaction(payload);
    return res.transactionHash;
};
