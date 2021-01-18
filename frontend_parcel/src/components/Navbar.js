import { Box, Flex, Spacer, Text, Heading, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { isLoggedInVar } from "../../cache";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { IS_LOGGED_IN } from "../../App";

const Navbar = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  console.log(data);
  const history = useHistory();
  const client = useApolloClient();
  return (
    <Flex align="center">
      <Heading color="green.500">
        <Link to="/">Auth</Link>
      </Heading>
      <Spacer />
      {data.isLoggedIn ? (
        <Button
          mr={4}
          variant="outline"
          colorScheme="green"
          onClick={() => {
            localStorage.removeItem("token");
            isLoggedInVar(false);
            client.resetStore();
            history.push("/");
          }}
        >
          Logout
        </Button>
      ) : (
        <>
          <Button mr={4} colorScheme="green">
            <Link to="/register">Register</Link>
          </Button>
          <Button mr={4} variant="ghost">
            <Link to="/login">Login</Link>
          </Button>
        </>
      )}

      <Text>
        <Link to="/geheimnis">Geheimnis</Link>
      </Text>
    </Flex>
  );
};

export default Navbar;
