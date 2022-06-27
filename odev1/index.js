const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const { events, locations, users, participants } = require("./data.json");

const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
  }

  type Query {
    #event
    events: [Event!]!
    event(id: ID!): Event!
  }
`;

const resolvers = {
  Query: {
    events: () => events,
    event: (parent, args) => {
      const event = events.find((event) => event.id === parseInt(args.id));
      if (!event) {
        return new Error("Event not found!");
      } else {
        return event;
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});

server.listen().then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});
