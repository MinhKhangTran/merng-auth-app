import { useQuery, gql } from "@apollo/client";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Geheimnis from "./src/pages/Geheimnis";
import Home from "./src/pages/Home";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";

import {
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export const IS_LOGGED_IN = gql`
  query isUserLoggedIn {
    isLoggedIn @client
  }
`;

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/register">
          <Register></Register>
        </Route>
        <PrivateRoute path="/geheimnis">
          <Geheimnis />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

const PrivateRoute = ({ children, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <Spinner />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Obacht!</AlertTitle>
        <AlertDescription>Etwas ist schief gelaufen :/</AlertDescription>
      </Alert>
    );
  return (
    <Route
      {...rest}
      render={() => {
        return data.isLoggedIn === true ? children : <Redirect to="/login" />;
      }}
    ></Route>
  );
};

export default App;
