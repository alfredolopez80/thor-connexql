import { expect } from 'chai';
import { contractRead } from './contractRead';
import { ethers } from 'ethers';
import { assertAbstractType } from 'graphql';

describe("#contractRead specs", function () {

    const balanceOfAbiSignature = "function balanceOf(address a) public view returns (uint)";
    const energyContractAddress = '0x0000000000000000000000000000456e65726779';
    beforeEach(function () {
    });

    it('when calling a contract get call, should resolve signature and params and call contract', async function () {
        const user = '0xf288d29bEBc6C72819Ec5c48F5CF1B516AA462CC';

        const paramsHex = ethers.utils.defaultAbiCoder.encode(
            ['address'],
            [user]
        );

        console.log(paramsHex)
        const resp = await contractRead()(energyContractAddress, balanceOfAbiSignature, paramsHex);

        expect(resp).equal('5000000125000000000000');
    });
});
