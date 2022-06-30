const { createServer } = require('http');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { PubSub } = require('graphql-subscriptions');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');

const { nanoid } = require('nanoid');
const { users, posts, comments } = require('./data');

const PORT = 4000;
const pubsub = new PubSub();

const typeDefs = gql`
  #User
  type User {
    id: ID!
    fullName: String!
    age: Int!
    posts: [Post!]!
    comment: [Comment!]!
  }

  input CreateUserInput {
    fullName: String!
    age: Int!
  }

  input UpdateUserInput {
    fullName: String
    age: Int
  }

  #Post
  type Post {
    id: ID!
    title: String!
    user_id: ID!
    user: User!
    comment: [Comment!]!
  }

  input CreatePostInput {
    title: String!
    user_id: ID!
  }

  input UpdatePostInput {
    title: String
    user_id: ID
  }

  #Comment
  type Comment {
    id: ID!
    text: String!
    post_id: ID!
    user: User!
    post: Post!
  }

  input CreateCommentInput {
    text: String!
    post_id: ID!
    user_id: ID!
  }

  input UpdateCommentInput {
    text: String
    post_id: ID
    user_id: ID
  }

  type DeleteAllOutput {
    count: Int!
  }

  type Query {
    #users
    users: [User!]!
    user(id: ID!): User!

    #posts
    posts: [Post!]!
    post(id: ID!): Post!

    #comments
    comments: [Comment!]!
    comment(id: ID!): Comment!
  }

  type Mutation {
    #user
    createUser(data: CreateUserInput!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
    deleteAllUsers: DeleteAllOutput!

    #post
    createPost(data: CreatePostInput!): Post!
    updatePost(id: ID!, data: UpdatePostInput!): Post!
    deletePost(id: ID!): Post!
    deleteAllPosts: DeleteAllOutput!

    #comment
    createComment(data: CreateCommentInput!): Comment!
    updateComment(id: ID!, data: UpdateCommentInput!): Comment!
    deleteComment(id: ID!): Comment!
    deleteAllComments: DeleteAllOutput!
  }

  type Subscription {
    #user subs
    userCreated: User!
    userUpdated: User!
    userDeleted: User!

    #post subs
    postCreated: Post!
    postUpdated: Post!
    postDeleted: Post!
    postCount: Int!

    #comment subs
    commentCreated: Comment!
    commentUpdated: Comment!
    commentDeleted: Comment!
    commentCount: Int!
  }
`;

const resolvers = {
  Query: {
    // user
    users: () => users,
    user: (parent, args) => {
      const user = users.find((user) => user.id === args.id);
      if (!user) {
        return new Error('User not found!');
      } else {
        return user;
      }
    },

    // post
    posts: () => posts,
    post: (parent, args) => {
      const post = posts.find((post) => post.id === args.id);
      if (!post) {
        return new Error('Post not found!');
      } else {
        return post;
      }
    },

    // comments
    comments: () => comments,
    comment: (parent, args) => {
      const comment = comments.find((comment) => comment.id === args.id);
      if (!comment) {
        return new Error('Comment not found!');
      } else {
        return comment;
      }
    },
  },

  User: {
    posts: (parent) => posts.filter((post) => post.user_id === parent.id),
    comment: (parent) =>
      comments.filter((comment) => comment.user_id === parent.id),
  },

  Post: {
    user: (parent) => users.find((user) => user.id === parent.user_id),
    comment: (parent) =>
      comments.filter((comment) => comment.post_id === parent.id),
  },

  Comment: {
    user: (parent) => users.find((user) => user.id === parent.user_id),
    post: (parent) => posts.find((post) => post.id === parent.post_id),
  },

  Mutation: {
    //User
    createUser: (parent, { data }, { pubsub }) => {
      const user = { id: nanoid(), ...data };
      users.push(user);

      pubsub.publish('userCreated', { userCreated: user });
      return user;
    },
    updateUser: (parent, { id, data }, { pubsub }) => {
      const user_index = users.findIndex((user) => user.id === id);

      if (user_index === -1) {
        return new Error('User not found!');
      }

      const updatedUser = (users[user_index] = {
        ...users[user_index],
        ...data,
      });

      pubsub.publish('userUpdated', { userUpdated: updatedUser });

      return updatedUser;
    },
    deleteUser: (parent, { id }, { pubsub }) => {
      const user_index = users.findIndex((user) => user.id === id);

      if (user_index === -1) {
        return new Error('User not found!');
      }

      const deletedUser = users[user_index];
      users.splice(user_index, 1);
      pubsub.publish('userDeleted', { userDeleted: deletedUser });

      return deletedUser;
    },
    deleteAllUsers: () => {
      const length = users.length;
      users.splice(0, length);

      return {
        count: length,
      };
    },

    //Post
    createPost: (parent, { data }, { pubsub }) => {
      const post = {
        id: nanoid(),
        ...data,
      };

      posts.push(post);
      pubsub.publish('postCreated', { postCreated: post });
      pubsub.publish('postCount', { postCount: posts.length });
      return post;
    },
    updatePost: (parent, { id, data }, { pubsub }) => {
      const post_index = posts.findIndex((post) => post.id === id);

      if (post_index === -1) {
        return new Error('Post not found!');
      }

      const updatedPost = (posts[post_index] = {
        ...posts[post_index],
        ...data,
      });
      pubsub.publish('postUpdated', { postUpdated: updatedPost });
      return updatedPost;
    },
    deletePost: (parent, { id }, { pubsub }) => {
      const post_index = posts.findIndex((post) => post.id === id);

      if (post_index === -1) {
        return new Error('Post not found!');
      }

      const deletedPost = posts[post_index];
      posts.splice(post_index, 1);
      pubsub.publish('postDeleted', { postDeleted: deletedPost });
      pubsub.publish('postCount', { postCount: posts.length });
      return deletedPost;
    },
    deleteAllPosts: (parent, args, { pubsub }) => {
      const length = posts.length;
      posts.splice(0, length);
      pubsub.publish('postCount', { postCount: posts.length });

      return {
        count: length,
      };
    },

    //Comment
    createComment: (parent, { data }) => {
      const comment = {
        id: nanoid(),
        ...data,
      };

      comments.push(comment);
      pubsub.publish('commentCount', { commentCount: comments.length });
      pubsub.publish('commentCreated', { commentCreated: comment });

      return comment;
    },
    updateComment: (parent, { id, data }) => {
      const comment_index = comments.findIndex((comment) => comment.id === id);

      if (comment_index === -1) {
        return new Error('Comment not found!');
      }

      const updatedComment = (comments[comment_index] = {
        ...comments[comment_index],
        ...data,
      });
      pubsub.publish('commentUpdated', { commentUpdated: updatedComment });
      return updatedComment;
    },
    deleteComment: (parent, { id }) => {
      const comment_index = comments.findIndex((comment) => comment.id === id);

      if (comment_index === -1) {
        return new Error('Comment not found!');
      }

      const deletedComment = comments[comment_index];
      comments.splice(comment_index, 1);
      pubsub.publish('commentCount', { commentCount: comments.length });
      pubsub.publish('commentDeleted', { commentDeleted: deletedComment });
      return deletedComment;
    },
    deleteAllComments: (parent, args, { pubsub }) => {
      const length = comments.length;
      comments.splice(0, length);
      pubsub.publish('commentCount', { commentCount: comments.length });
      return {
        count: length,
      };
    },
  },

  Subscription: {
    // user
    userCreated: {
      subscribe: () => pubsub.asyncIterator('userCreated'),
    },
    userUpdated: {
      subscribe: () => pubsub.asyncIterator('userUpdated'),
    },
    userDeleted: {
      subscribe: () => pubsub.asyncIterator('userDeleted'),
    },

    // post
    postCreated: {
      subscribe: () => pubsub.asyncIterator('postCreated'),
    },
    postUpdated: {
      subscribe: () => pubsub.asyncIterator('postUpdated'),
    },
    postDeleted: {
      subscribe: () => pubsub.asyncIterator('postDeleted'),
    },
    postCount: {
      subscribe: () => {
        setTimeout(() =>
          pubsub.publish('postCount', { postCount: posts.length })
        );

        return pubsub.asyncIterator('postCount');
      },
    },

    // comment
    commentCreated: {
      subscribe: () => pubsub.asyncIterator('commentCreated'),
    },
    commentUpdated: {
      subscribe: () => pubsub.asyncIterator('commentUpdated'),
    },
    commentDeleted: {
      subscribe: () => pubsub.asyncIterator('commentDeleted'),
    },
    commentCount: {
      subscribe: () => {
        setTimeout(() =>
          pubsub.publish('commentCount', { commentCount: comments.length })
        );

        return pubsub.asyncIterator('commentCount');
      },
    },
  },
};

async function startApolloServer() {
  // Create schema, which will be used separately by ApolloServer and
  // the WebSocket server.
  const schema = makeExecutableSchema({ typeDefs, resolvers });

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
