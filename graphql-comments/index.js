const { ApolloServer, gql } = require('apollo-server');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');
const { nanoid } = require('nanoid');
const { users, posts, comments } = require('./data');

const typeDefs = gql`
  #User
  type User {
    id: ID!
    fullName: String!
    posts: [Post!]!
    comment: [Comment!]!
  }

  input CreateUserInput {
    fullName: String!
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
    createUser(data: CreateUserInput!): User!
    createPost(data: CreatePostInput!): Post!
    createComment(data: CreateCommentInput!): Comment!
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
    createUser: (parent, { data }) => {
      const user = { id: nanoid(), ...data };
      users.push(user);

      return user;
    },
    createPost: (parent, { data }) => {
      const post = {
        id: nanoid(),
        ...data,
      };

      posts.push(post);
      return post;
    },
    createComment: (parent, { data }) => {
      const comment = {
        id: nanoid(),
        ...data,
      };

      comments.push(comment);
      return comment;
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
