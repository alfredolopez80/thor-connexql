"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractRead = void 0;
const thor_devkit_1 = require("thor-devkit");
const ethers_1 = require("ethers");
exports.contractRead = (connex) => async (address, abiSignature, params) => {
    const ethersAbiStruct = ethers_1.ethers.utils.parseSignature(abiSignature);
    const args = thor_devkit_1.abi.decodeParameters(ethersAbiStruct.inputs, params);
    const Web3 = require('web3');
    const { thorify } = require('thorify');
    const thor = thorify(new Web3(), process.env.THOR_URL);
    const contract = new thor.eth.Contract(abiSignature, address);
    return {
        decoded: {
            balanceOf: '100000000000000000000',
        }
    };
};
