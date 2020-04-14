import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Recipe from './pages/Recipe/Recipe';

function App(props) {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact component={Recipe} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/Recipe" exact component={Recipe} />
      </Switch>
    </Router>
  );
}

export default App;
