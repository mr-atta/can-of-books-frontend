import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { render } from "@testing-library/react";
import Form from "react-bootstrap/Form";

class UpdateForm extends React.Component {
  render() {
    return (
      <Form onSubmit={this.props.updateBook}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            type="text"
            name="bookName"
            defaultValue={this.props.userData[this.props.index].name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            defaultValue={this.props.userData[this.props.index].description}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Image-URL</Form.Label>
          <Form.Control
            type="text"
            name="imgUrl"
            defaultValue={this.props.userData[this.props.index].img}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            defaultValue={this.props.userData[this.props.index].states}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          UpDate Book
        </Button>
      </Form>
    );
  }
}

export default UpdateForm;
