"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedSchema_1 = require("./typedSchema");
const filter_1 = require("./filter");
const contractRead_1 = require("./contractRead");
const account_1 = require("./account");
const transaction_1 = require("./transaction");
const { gql } = require('apollo-server');
const GraphQLJSON = require('graphql-type-json');
const typeDefs = gql(typedSchema_1.connexSchema);
module.exports = (connex) => {
    const resolvers = {
        JSON: GraphQLJSON,
        Query: {
            connexVersion: () => connex.version,
            genesis: () => connex.thor.genesis,
            status: () => connex.thor.status,
            account: account_1.account(connex),
            filter: filter_1.filter(connex),
            contractFilter: filter_1.contractFilter(connex),
            contractRead: contractRead_1.contractRead(connex),
        },
        Account: {
            code: account_1.accountCode(connex),
        },
        Mutation: {
            sendRawTransaction: transaction_1.sendRawTransaction(connex)
        }
    };
    return {
        typeDefs,
        resolvers,
    };
};
