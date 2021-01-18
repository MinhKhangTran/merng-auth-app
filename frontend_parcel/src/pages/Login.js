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

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(password: $password, email: $email)
  }
`;

const Login = () => {
  const history = useHistory();
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.login);
      isLoggedInVar(true);
      history.push("/geheimnis");
    },
  });
  return (
    <Layout>
      <UserForm action={login} type="login" />
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

export default Login;
