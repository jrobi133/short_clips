// import logo from './logo.svg';
// import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import Signup from "./components/signup";
import Nav from "./components/nav";
import Home from "./pages/home";
import UploadVideoPage from "./pages/UploadVideoPage";
import Test from "./pages/test";
import DetailVideoPage from "./pages/DetailVideoPage/DetailVideoPage";
import SubscriptionPage from "./pages/SubscriptionPage";

function App() {
  return (
    <Router>
      <>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/video/upload" component={UploadVideoPage} />
          <Route exact path="/video/:videoId" component={DetailVideoPage} />
          <Route exact path="/subscription" component={SubscriptionPage} />
          {/* <Route exact path="/books/:id">
            <Detail />
          </Route>
          <Route>
            <NoMatch />
          </Route>  */}
        </Switch>
      </>
    </Router>
  );
}

export default App;
