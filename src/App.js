import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import BestBooks from "./BestBooks";
import Login from "./Login";
import Profile from "./componants/Profile";
import { withAuth0 } from "@auth0/auth0-react"; // with Auth0

// import LogoutButton from "./componants/LogoutButton";
// import LoginButton from "./componants/LoginButton";

class App extends React.Component {
  render() {
    // console.log("app", this.props);
    const isAuthenticated = this.props.auth0.isAuthenticated;
    console.log(isAuthenticated);
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              {isAuthenticated ? <BestBooks /> : <Login />}
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            <Router exact path="/profile">
              <Profile />
            </Router>
          </Switch>
          <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    );
  }
}

export default withAuth0(App); // with Auth0
