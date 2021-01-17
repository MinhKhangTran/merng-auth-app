import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Box bgGradient="linear(to-br,green.100,orange.300)" w="100vw" h="100vh">
      <Box w="90%" mx="auto" p={4}>
        <Navbar></Navbar>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
