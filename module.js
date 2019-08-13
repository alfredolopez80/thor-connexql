const { gql } = require('apollo-server');
const fs = require('fs');
const connexql = fs.readFileSync('./schemas/connex.gql');
const GraphQLJSON = require('graphql-type-json');

// The GraphQL schema
const typeDefs = gql(connexql.toString('utf8'));


module.exports = (connex) => {
    // A map of functions which return data for the schema.
    const resolvers = {
        JSON: GraphQLJSON,
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
            },
            filter: async (obj, input) => {                
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
                    return {
                        ...i
                    };
                });
                if (query) {
                    filter.criteria(query);
                }

                const logs = await filter.apply(0, limit | 100);
                return logs;
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