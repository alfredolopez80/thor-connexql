const { gql } = require('apollo-server');
const fs = require('fs');
const connexql = fs.readFileSync('./schemas/connex.gql');

// The GraphQL schema
const typeDefs = gql(connexql.toString('utf8'));


module.exports = (connex) => {
    // A map of functions which return data for the schema.
    const resolvers = {
        Query: {
            connexVersion: () => connex.version,
            genesis: () => connex.thor.genesis,
            status: () => connex.thor.status,
            account: async (obj, { address }) => {
                const resp = await connex.thor.account(address).get();
                return {
                    address,
                    ...resp,
                }
            }
        },
        Account: {
            code: async (obj) => {
                const { code } = await connex.thor.account(obj.address).getCode();
                return code;
            }
        }
    };

    return {
        typeDefs,
        resolvers,
    }
}