"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("./filter");
const account_1 = require("./account");
const { gql } = require('apollo-server');
const fs = require('fs');
const connexql = fs.readFileSync('./schemas/connex.gql');
const GraphQLJSON = require('graphql-type-json');
const typeDefs = gql(connexql.toString('utf8'));
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
        },
        Account: {
            code: account_1.accountCode(connex),
        }
    };
    return {
        typeDefs,
        resolvers,
    };
};
