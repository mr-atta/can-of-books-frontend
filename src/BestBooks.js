import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import { withAuth0 } from "@auth0/auth0-react";

import "./BestBooks.css";
import axios from "axios";

// import { element } from "prop-types";

class MyFavoriteBooks extends React.Component {
  // 12
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
    };
  }
  // 12
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

  // /////////////////////////////////////////////

  render() {
    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>This is a collection of my favorite books</p>
          {this.state.userData.map((element) => {
            return (
              <>
                <Card
                  style={{
                    width: "20rem",
                    display: "inline-block",
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
                    <Card.Text>By: {element.status}</Card.Text>
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </Jumbotron>

        {/* <div>{this.state.userData}</div> */}
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
