const { createServer } = require('http');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const db = require('./data');
const pubsub = require('./pubsub');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const PORT = 4000;

async function startApolloServer() {
  // Create schema, which will be used separately by ApolloServer and
  // the WebSocket server.

  const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  // Create an Express app and HTTP server; we will attach the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express();
  const httpServer = createServer(app);

  // Set up WebSocket server.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  const serverCleanup = useServer({ schema }, wsServer);

  // Set up ApolloServer.
  const server = new ApolloServer({
    schema,
    context: {
      pubsub,
      db,
    },
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  // Now that our HTTP server is fully set up, actually listen.
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startApolloServer();
