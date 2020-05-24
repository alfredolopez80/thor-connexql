require('dotenv').config()

import { Framework } from '@vechain/connex-framework';
import { Driver, SimpleNet } from '@vechain/connex-driver';
// const connexDriver = require('@vechain/connex.driver-nodejs');
const GQL = require('fastify-gql')
const { makeExecutableSchema } = require('graphql-tools')

const fastify = require('fastify');
const app = fastify();

const thorUrl =  process.env.THOR_URL;
const port = process.env.PORT;

(async () => {
    const driver = await Driver.connect(new SimpleNet(thorUrl));
    const connex = new Framework(driver);

    const { typeDefs, resolvers } = require('./module')(connex);
    app.register(GQL, {
        schema: makeExecutableSchema({ typeDefs, resolvers }),
        graphiql: true,
    });

    await app.listen(port, '0.0.0.0');
    console.log(`Listening GraphiQL at port ${port}`);
})();
