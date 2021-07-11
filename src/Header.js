import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./Header.css";

import LoginButton from "./componants/LoginButton";
import LogoutButton from "./componants/LogoutButton";
import { withAuth0 } from "@auth0/auth0-react"; // with Auth0

class Header extends React.Component {
  render() {
    // console.log(this.props);
    const isAuthenticated = this.props.auth0.isAuthenticated; //
    console.log(isAuthenticated);
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </Navbar>
    );
  }
}

export default withAuth0(Header); // with Auth0
