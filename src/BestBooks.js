import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import { withAuth0 } from "@auth0/auth0-react";

import "./BestBooks.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import AddBookModel from "./componants/AddBookModel";

// import { element } from "prop-types";

class MyFavoriteBooks extends React.Component {
  // 12
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      userData: [],
    };
  }
  // lab 12
  componentDidMount = async () => {
    // console.log("hello");

    let response = await axios.get(
      `http://localhost:3002/books?email=${this.props.auth0.user.email}`
    );

    console.log(response.data);

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

  // render /////////////////////////////////////////////
  render() {
    return (
      <>
        <AddBookModel
          showModel={this.showModel}
          hideModel={this.hideModel}
          addBook={this.addBook}
          show={this.state.show}
        />

        <Button variant="dark" onClick={this.showModel}>
          Add A Book
        </Button>

        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>This is a collection of my favorite books</p>

          {this.state.userData.map((element, index) => {
            return (
              <div key={index} style={{ display: "inline-block" }}>
                <Card
                  style={{
                    width: "20rem",
                    // display: "inline-block",
                    margin: "30px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={element.img}
                    alt={element.name}
                  />
                  <Card.Body>
                    <Card.Title>{element.name}</Card.Title>
                    <Card.Text>description: {element.description}</Card.Text>
                    <Card.Text> {element.states}</Card.Text>
                  </Card.Body>
                  <Button
                    variant="danger"
                    onClick={() => this.deleteBook(index)}
                  >
                    Delete
                  </Button>
                </Card>
              </div>
            );
          })}
        </Jumbotron>
        {/* <div>{this.state.userData}</div> */}
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
