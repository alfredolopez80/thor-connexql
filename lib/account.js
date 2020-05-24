"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountCode = exports.account = void 0;
exports.account = (connex) => async (obj, { address }) => {
    const resp = await connex.thor.account(address).get();
    return Object.assign({ address }, resp);
};
exports.accountCode = (connex) => async (obj) => {
    const { code } = await connex.thor.account(obj.address).getCode();
    return code;
};
