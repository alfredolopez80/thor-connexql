const encode = () => {
    const reserved = _encodeReserved();
    if (this.signature) {
        return txRLP.encode(Object.assign(Object.assign({}, this.body), { reserved, signature: this.signature }));
    }
    return unsignedTxRLP.encode(Object.assign(Object.assign({}, this.body), { reserved }));
};
const _encodeReserved = () => {
    const reserved = this.body.reserved || {};
    const list = [featuresKind.data(reserved.features || 0, 'reserved.features').encode(),
        ...(reserved.unused || [])];
    while (list.length > 0) {
        if (list[list.length - 1].length === 0) {
            list.pop();
        }
        else {
            break;
        }
    }
    return list;
};
const unsignedTxRLP = new RLP({
    name: 'tx',
    kind: [
        { name: 'chainTag', kind: new RLP.NumericKind(1) },
        { name: 'blockRef', kind: new RLP.CompactFixedBlobKind(8) },
        { name: 'expiration', kind: new RLP.NumericKind(4) },
        {
            name: 'clauses', kind: {
                item: [
                    { name: 'to', kind: new RLP.NullableFixedBlobKind(20) },
                    { name: 'value', kind: new RLP.NumericKind(32) },
                    { name: 'data', kind: new RLP.BlobKind() },
                ],
            },
        },
        { name: 'gasPriceCoef', kind: new RLP.NumericKind(1) },
        { name: 'gas', kind: new RLP.NumericKind(8) },
        { name: 'dependsOn', kind: new RLP.NullableFixedBlobKind(32) },
        { name: 'nonce', kind: new RLP.NumericKind(8) },
        { name: 'reserved', kind: { item: new RLP.BufferKind() } },
    ],
});
const txRLP = new RLP({
    name: 'tx',
    kind: [...unsignedTxRLP.profile.kind, { name: 'signature', kind: new RLP.BufferKind() }],
});
const featuresKind = new RLP.NumericKind(4);
