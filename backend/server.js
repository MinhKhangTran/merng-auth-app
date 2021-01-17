const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const { Query } = require("./graphql/resolvers/query");
const { Mutation } = require("./graphql/resolvers/mutation");
const model = require("./model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

// Get user info from token in header
const getUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid Session");
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
  context: async ({ req }) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    return { model, user };
  },
});

server.applyMiddleware({ app });

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen({ port }, () => {
      console.log("server is up and running");
    });
  })
  .catch((error) => console.log(error));
