import { createServer } from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, gql } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { v4 as uuidv4 } from 'uuid';
import pubsub from './pubsub';

const PORT = 4000;

const messages = [];

const typeDefs = gql`
  type Message {
    id: ID!
    message: String!
    user: String!
  }
  input createMessage {
    message: String!
    user: String!
  }
  type Query {
    messages: [Message!]!
  }
  type Mutation {
    createMessage(data: createMessage!): Message!
  }
  type Subscription {
    messageCreated: Message!
  }
`;

const resolvers = {
  Query: {
    messages: () => messages,
  },

  Mutation: {
    createMessage: (_, { data }, { pubsub }) => {
      const message = {
        id: uuidv4(),
        ...data,
      };
      messages.unshift(message);
      pubsub.publish('messageCreated', { messageCreated: message });
      return message;
    },
  },

  Subscription: {
    messageCreated: {
      subscribe: (_, __, ___) => pubsub.asyncIterator('messageCreated'),
    },
  },
};

async function startApolloServer() {
  const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  const app = express();
  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    context: {
      pubsub,
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
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

  httpServer.listen(PORT, () => {
    console.log(`🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();
