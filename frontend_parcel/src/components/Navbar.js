import { Box, Flex, Spacer, Text, Heading, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex>
      <Heading color="green.500">
        <Link to="/">Auth</Link>
      </Heading>
      <Spacer />
      <Button mr={4} colorScheme="green">
        <Link to="/register">Register</Link>
      </Button>
      <Button variant="ghost">
        <Link to="/login">Login</Link>
      </Button>
    </Flex>
  );
};

export default Navbar;
