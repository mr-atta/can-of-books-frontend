import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

class AddBookModel extends React.Component {
  render() {
    return (
      <>
        {/* {this.props.showModel && ( */}
        <Modal show={this.props.show}>
          <Modal.Header>
            <Modal.Title>Add Book</Modal.Title>
          </Modal.Header>
          <Card.Img variant="top" src={this.props.url} />
          <Modal.Body>
            <form onSubmit={this.props.addBook}>
              <input placeholder="Book Name" type="text" name="bookName" />
              <input placeholder="Description" type="text" name="description" />
              <input placeHolder="Img url" type="text" name="imgUrl" />
              <select placeHolder="State" type="select" name="state">
                <option value="recommended">Recommended</option>
                <option value="topTen">Top Ten</option>
                <option value="readLater">Read Later</option>
              </select>
              <input type="submit" value="ADD" />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.hideModel}>
              Close
            </Button>
            {/* <Button variant="secondary">Add Book</Button> */}
          </Modal.Footer>
        </Modal>
        {/* )} */}
      </>
    );
  }
}

export default AddBookModel;
