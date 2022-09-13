import { createServer } from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import db from './data';
import mongodb from './db';
import _pubsub from './pubsub';

import typeDefs from '@type-defs';
import resolvers from '@resolvers';

import User from './models/User';
import Post from './models/Post';
import Comment from './models/Comment';

const PORT = 4000;
mongodb();

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
      _pubsub,
      db,
      _db: {
        User,
        Post,
        Comment,
      },
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
    console.log(`🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();
