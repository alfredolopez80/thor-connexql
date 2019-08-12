const connexDriver = require('@vechain/connex.driver-nodejs');
const { Framework } = require('@vechain/connex-framework');
const GQL = require('fastify-gql')
const { makeExecutableSchema } = require('graphql-tools')


const fastify = require('fastify')
const app = fastify();

const URL = 'https://thor-staging.decent.bet';
// app.get('/', async function (req, reply) {
//     const query = '{ hello }'
//     return reply.graphql(query)
// })

(async () => {
    const driver = await connexDriver.Driver.connect(new connexDriver.SimpleNet(URL));
    const connex = new Framework(driver);

    const { typeDefs, resolvers } = require('./module')(connex);
    app.register(GQL, {
        schema: makeExecutableSchema({ typeDefs, resolvers }),
        graphiql: true,
    });

    await app.listen(3000);
})();
