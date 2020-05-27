import { abi } from 'thor-devkit';
import { ethers } from 'ethers';

const Web3 = require('web3');
const { thorify } = require('thorify');

export const sendRawTransaction = () => async (payload: string) => {
    const thor = thorify(new Web3(), process.env.THOR_URL || `https://thor-staging.decent.bet`);
    const res = await thor.eth.sendSignedTransaction(payload);

    return res.transactionHash;
}