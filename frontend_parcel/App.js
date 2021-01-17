import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./src/pages/Home";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";

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
      </Switch>
    </Router>
  );
};

export default App;
