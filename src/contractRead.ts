import { abi } from 'thor-devkit';
import { ethers } from 'ethers';

const Web3 = require('web3');
const { thorify } = require('thorify');

export const contractRead = () => async (address: string, abiSignature, params: string) => {
    const ethersAbiStruct = ethers.utils.parseSignature(abiSignature);  
    const jsonABI = [{
        ...ethersAbiStruct
    }];
    let args = abi.decodeParameters(<any>ethersAbiStruct.inputs, params);
    const thor = thorify(new Web3(), process.env.THOR_URL || `https://thor-staging.decent.bet`);
    const contract = new thor.eth.Contract(jsonABI, address);
    args = ethersAbiStruct.inputs.map(p => args[p.name]);
    return await contract.methods[ethersAbiStruct.name](...(args as [])).call();  
}