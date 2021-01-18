import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Heading,
} from "@chakra-ui/react";

const UserForm = (props) => {
  const [values, setValues] = React.useState();
  const [show, setShow] = React.useState(false);

  const showPW = () => {
    setShow(!show);
  };

  const handleChange = (e) => {
    setValues((values) => {
      return { ...values, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.action({ variables: { ...values } });
  };
  return (
    <Box
      bg="white"
      w={{ base: "90%", md: "75%" }}
      padding={8}
      borderRadius="lg"
    >
      <Heading color="green.500">
        {props.type === "register" ? "Registrierung" : "Login"}
      </Heading>
      <form onSubmit={handleSubmit}>
        {props.type === "register" && (
          <FormControl mt={4} id="username" isRequired>
            <FormLabel>Benutzername</FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="Benutzername"
              name="username"
              onChange={handleChange}
            ></Input>
            <FormErrorMessage>
              Benutzername muss ausgefüllt sein!
            </FormErrorMessage>
          </FormControl>
        )}

        <FormControl mt={4} id="email" isRequired>
          <FormLabel>E-Mail</FormLabel>
          <Input
            variant="flushed"
            type="email"
            placeholder="E-Mail"
            name="email"
            onChange={handleChange}
          ></Input>
          <FormErrorMessage>E-Mail muss ausgefüllt sein!</FormErrorMessage>
        </FormControl>
        <FormControl mt={4} id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              variant="flushed"
              type={show ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={handleChange}
            ></Input>
            <InputRightElement w="4.5rem">
              <Button
                colorScheme="green"
                variant="ghost"
                size="sm"
                onClick={showPW}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>Password muss ausgefüllt sein!</FormErrorMessage>
        </FormControl>
        <Button type="submit" mt={8} colorScheme="green" variant="outline">
          {props.type === "register" ? "Registrieren" : "Einloggen"}
        </Button>
      </form>
    </Box>
  );
};

export default UserForm;
