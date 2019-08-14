import { abi, Transaction } from 'thor-devkit';
import * as utils from 'web3-utils';
import * as ethers from 'ethers';

const getEventSignatureFn = (topic: string) => {
    const splitParen = topic.split('(');
    const fnName = splitParen[0];
    const splitComma = splitParen[1].split(',');
    const inputs: abi.Event.Parameter[] = splitComma.map((i: string) => {
        const item: any = i.replace(')', '');
        return {
            name: `__${item}`,
            type: item,
            indexed: true,
        };
    })
    let fn = new abi.Event({
        inputs,
        type: 'event',
        name: fnName,
        anonymous: false,
    });
    return fn;
}



export const contractFilter = (connex) =>
    async (obj, input) => {
        const abi = ethers.utils.parseSignature(input.abiSignature);
        const visitor = connex.thor.account(input.address).event(abi);

        const { range, order, limit } = input.filter;
        let indexed = [];
        if (input.filter.indexed) {
            indexed = input.filter.indexed.map((i: any) => Object.assign({}, i));
        }
        const filter = visitor.filter(indexed);
        if (range) {
            filter.range({
                unit: range.unit === 'block' ? range.unit : 'time',
                from: range.from,
                to: range.to,
            });
        }
        if (order) {
            filter.order(order);
        } else {
            filter.order('asc');
        }

        if (!input.criterias) {
            input.criterias = [];
        }
        const query = input.criterias.map(i => {
            console.log(i, utils.isHex(i.topic0))
            if (i.topic0 && !utils.isHex(i.topic0)) {
                i.topic0 = getEventSignatureFn(i.topic0).signature;
            }
            if (i.topic1 && !utils.isHex(i.topic1)) {
                i.topic1 = getEventSignatureFn(i.topic1).signature;
            }
            if (i.topic2 && !utils.isHex(i.topic2)) {
                i.topic2 = getEventSignatureFn(i.topic2).signature;
            }
            if (i.topic3 && !utils.isHex(i.topic3)) {
                i.topic3 = getEventSignatureFn(i.topic3).signature;
            }
            if (i.topic4 && !utils.isHex(i.topic4)) {
                i.topic4 = getEventSignatureFn(i.topic4).signature;
            }
            return {
                ...i
            };
        });
        if (query.length > 0) {
            filter.criteria(query);
        }

        const logs = await filter.apply(0, limit || 200);

        return logs;
    }

export const filter = (connex) =>
    async (obj, input) => {
        const { kind, range, order, limit, criterias } = input.filter;
        const filter = connex.thor.filter(kind);
        if (range) {
            filter.range({
                unit: range.unit === 'block' ? range.unit : 'time',
                from: range.from,
                to: range.to,
            });
        }

        if (order) {
            filter.order(order);
        } else {
            filter.order('asc');
        }

        const query = criterias.map(i => {
            console.log(i, utils.isHex(i.topic0))
            if (i.topic0 && !utils.isHex(i.topic0)) {
                i.topic0 = getEventSignatureFn(i.topic0).signature;
            }
            if (i.topic1 && !utils.isHex(i.topic1)) {
                i.topic1 = getEventSignatureFn(i.topic1).signature;
            }
            if (i.topic2 && !utils.isHex(i.topic2)) {
                i.topic2 = getEventSignatureFn(i.topic2).signature;
            }
            if (i.topic3 && !utils.isHex(i.topic3)) {
                i.topic3 = getEventSignatureFn(i.topic3).signature;
            }
            if (i.topic4 && !utils.isHex(i.topic4)) {
                i.topic4 = getEventSignatureFn(i.topic4).signature;
            }
            return {
                ...i
            };
        });
        if (query) {
            filter.criteria(query);
        }

        const logs = await filter.apply(0, limit | 200);
        // console.log(logs[0].data)
        // console.log(Transaction.decode(logs[0].data))
        return logs;
    }