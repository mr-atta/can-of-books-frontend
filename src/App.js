import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import BestBooks from "./BestBooks";
import Login from "./Login";
import Profile from "./componants/Profile";
import { withAuth0 } from "@auth0/auth0-react"; // with Auth0
import AddBookModel from "./componants/AddBookModel";
import axios from "axios";

// import LogoutButton from "./componants/LogoutButton";
// import LoginButton from "./componants/LoginButton";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      userData: [],
    };
  }

  componentDidMount = async () => {
    // console.log("hello");

    // `http://localhost:3002/books?email=${this.props.auth0.user.email}`
    let response = await axios.get(
      `http://localhost:3002/books?email=mohammadatta97@gmail.com`
    );

    // console.log(response.data);

    this.setState({
      userData: response.data,
    });
  };

  // Add New Book (function)
  addBook = async (event) => {
    event.preventDefault();
    // obj to send the data in it (link)
    const newBookData = {
      bookName: event.target.bookName.value,
      description: event.target.description.value,
      imgUrl: event.target.imgUrl.value,
      state: event.target.state.value,
      email: this.props.auth0.user.email,
    };

    const newResponse = await axios.post(
      `http://localhost:3002/addbook`,
      newBookData
    );
    console.log(newResponse.data);
    this.setState({
      userData: newResponse.data,
    });
  };

  // Delete Selected Book (function)
  deleteBook = async (index) => {
    let paramsObj = {
      email: this.props.auth0.user.email,
    };

    const response = await axios.delete(
      `http://localhost:3002/deletebook/${index}`,
      { params: paramsObj }
    );
    // console.log(response);
    this.setState({
      userData: response.data,
    });
  };

  showModel = () => {
    this.setState({
      show: true,
    });
  };
  hideModel = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    // console.log("app", this.props);
    const isAuthenticated = this.props.auth0.isAuthenticated;
    // console.log(isAuthenticated);
    return (
      <>
        <AddBookModel
          showModel={this.showModel}
          show={this.state.show}
          hideModel={this.hideModel}
          addBook={this.addBook}
        />
        <Router>
          {/* <IsLoadingAndError> */}
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              {isAuthenticated ? (
                <BestBooks
                  showModel={this.showModel}
                  userData={this.state.userData}
                  deleteBook={this.deleteBook}
                />
              ) : (
                <Login />
              )}
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
