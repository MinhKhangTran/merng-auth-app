const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User!
    me: User!
  }
  type Mutation {
    login(password: String!, email: String!): String!
    register(password: String!, username: String!, email: String!): String!
  }
  type User {
    id: ID!
    password: String!
    username: String!
    email: String!
  }
`;

module.exports = typeDefs;
