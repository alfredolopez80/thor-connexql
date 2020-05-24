
// payload in hex
// tx -> hex
export const sendRawTransaction = (connex) => async (payload: any) => {
    const Web3 = require('web3');
    const { thorify } = require('thorify');
    const thor = thorify(new Web3(), process.env.THOR_URL);        
    const res = await thor.eth.sendSignedTransaction(payload);

    return res.transactionHash;
}