// import logo from './logo.svg';
// import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./components/signup";
import Nav from "./components/nav";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <>
        <Nav />
        <Switch>
          {/* <Route exact path={["/", "/home"]}>
            <Home />
          </Route>
          <Route exact path={["/signup"]}>
            <Signup />
          </Route>
          {/* <Route exact path="/books/:id">
            <Detail />
          </Route>
          <Route>
            <NoMatch />
          </Route> */}
        </Switch>
      </>
    </Router>
  );
}

export default App;
