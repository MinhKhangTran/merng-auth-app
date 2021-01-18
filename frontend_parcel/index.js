import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  gql,
} from "@apollo/client";
import { setContext } from "apollo-link-context";
import { cache } from "./cache";

const uri = "http://localhost:8000/graphql";
const httpLink = createHttpLink({ uri });
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  typeDefs,
});

// Local typedefs
export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;
ReactDOM.render(
  <ApolloProvider client={client}>
    <ChakraProvider resetCss>
      <App />
    </ChakraProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
