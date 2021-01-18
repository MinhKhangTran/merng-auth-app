import React from "react";
import Layout from "../components/Layout";
import UserForm from "../components/UserForm";
import { gql, useMutation } from "@apollo/client";
import { isLoggedInVar } from "../../cache";
import { useHistory } from "react-router-dom";
import {
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(password: $password, email: $email, username: $username)
  }
`;

const Register = () => {
  const history = useHistory();
  const [register, { loading, error }] = useMutation(REGISTER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.register);
      isLoggedInVar(true);
      history.push("/geheimnis");
    },
  });
  return (
    <Layout>
      <UserForm action={register} type="register" />
      {loading && <Spinner />}
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Obacht!</AlertTitle>
          <AlertDescription>Etwas ist schief gelaufen :/</AlertDescription>
        </Alert>
      )}
    </Layout>
  );
};

export default Register;
