import { connexSchema as typeDefs } from './typedSchema';
import { filter, contractFilter } from './filter';
import { contractRead} from './contractRead';
import { account, accountCode } from './account';
import { sendRawTransaction } from './transaction';
const GraphQLJSON = require('graphql-type-json');

// The GraphQL schema
// const typeDefs = gql(connexSchema);


module.exports = (connex) => {
    // A map of functions which return data for the schema.
    const resolvers = {
        JSON: GraphQLJSON,
        Query: {
            connexVersion: () => connex.version,
            genesis: () => connex.thor.genesis,
            status: () => connex.thor.status,
            account: account(connex),
            filter: filter(connex),
            contractFilter: contractFilter(connex),
            contractRead: contractRead(),
        },
        Account: {
            code: accountCode(connex),
        },
        Mutation: {
            sendRawTransaction: sendRawTransaction(connex)
        }
    };

    return {
        typeDefs,
        resolvers,
    }
}