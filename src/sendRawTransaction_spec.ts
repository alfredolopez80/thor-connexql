import { expect } from 'chai';
import { contractRead } from './contractRead';
import { ethers } from 'ethers';
import { assertAbstractType } from 'graphql';
import { Transaction, cry } from 'thor-devkit';
import { sendRawTransaction } from './transaction';
import { randomBytes } from 'ethers/utils';

describe("#sendRawTransaction specs", function () {

    const addr = '0xc9B98483DB4b92e0e151d2eD12615dA7E06910a7';
    const pvk = '0x2ba93731461493fa2af1b9ba60d84efbab7fee5fffeff70aee33cdbbb0a5d83b'
    const balanceOfAbiSignature = "function balanceOf(address a) public view returns (uint)";
    const energyContractAddress = '0x0000000000000000000000000000456e65726779';
    beforeEach(function () {
    });

    it('when sending signed transaction, should execute and accept contract call', async function () {
        const user = '0xf288d29bEBc6C72819Ec5c48F5CF1B516AA462CC';
        let clauses =  [{
            to: '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed',
            value: 10000,
            data: '0x'
        }]
        
        // calc intrinsic gas
        let gas = Transaction.intrinsicGas(clauses)
        console.log(gas)
        // 21000
        
        let body: Transaction.Body = {
            chainTag: 0x27,
            blockRef: '0x005c2d1f58170a0865271f7168d749c0547d95e2c56b9302979dca863c979bee'.substring(0, 18),
            expiration: 18,
            clauses: clauses,
            gasPriceCoef: 128,
            gas: 21000,
            dependsOn: null,
            nonce: ethers.utils.hexlify(randomBytes(8))
        }
        console.log(body)
        let privKey = cry.secp256k1.generatePrivateKey()

        let tx = new Transaction(body);
        let signingHash = cry.blake2b256(tx.encode());
        tx.signature = cry.secp256k1.sign(signingHash, privKey);
        
        let raw = tx.encode()
        const resp = await sendRawTransaction()(`0x${raw.toString('hex')}`);

        expect(resp.toString()).equal('Error: tx rejected: insufficient energy');
    });
});
