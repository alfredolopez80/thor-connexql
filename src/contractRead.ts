import { abi } from 'thor-devkit';
import { ethers } from 'ethers';
export const contractRead = (connex) => async (address: string, abiSignature, params: string) => {
    const ethersAbiStruct = ethers.utils.parseSignature(abiSignature);   
    // const inputArgs = ethers.utils.defaultAbiEncoder.decode(params);
    const args = abi.decodeParameters(<any>ethersAbiStruct.inputs, params);
    // TODO: 
    // thor-devkit, thorify

    const Web3 = require('web3');
    const { thorify } = require('thorify');
    const thor = thorify(new Web3(), process.env.THOR_URL);


    const contract = new thor.eth.Contract(abiSignature, address);
   // const resp = await contract.methods[ethersAbiStruct.name](...args).call();
   
    return {
        decoded: {
            balanceOf: '100000000000000000000',
        }
    }
}