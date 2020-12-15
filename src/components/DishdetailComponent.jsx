import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  BreadcrumbItem,
  Breadcrumb,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Label,
  Row,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

const DishDetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active> {props.dish.name} </BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.comments} />
          {/* CommentForm inside RenderComments */}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const RenderComments = (comments) => {
  const card = comments.comments.map((comment) => {
    return (
      <div key={comment.id}>
        <ul className="list-unstyled">
          <li> {comment.comment} </li>
        </ul>
        <ul className="list-unstyled">
          <li>
            -- {comment.author}{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}
          </li>
        </ul>
      </div>
    );
  });
  return (
    <div className="col-12 col-md-5 m-1">
      <h4>Comments</h4>
      {card}
      <CommentForm></CommentForm>
    </div>
  );
};

const RenderDish = (dish) => {
  if (dish != null) {
    dish = dish.dish;
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg src={dish.image} alt={dish.name}></CardImg>
          <CardBody>
            <CardTitle tag="h4">{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
};

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  handleSubmit = (values) => {
    this.toggleModal();
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
  };

  render() {
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;

    return (
      <div>
        <React.Fragment>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <div className="p-2">
                  <Row className="form-group">
                    <Label htmlFor="rating">Rating</Label>
                    <Control.select
                      model=".rating"
                      id="rating"
                      name="rating"
                      className="form-control"
                      defaultValue="1"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Control.select>
                  </Row>
                </div>
                <div className="p-2">
                  <Row className="form-group">
                    <Label htmlFor="author">Your name</Label>
                    <Control.text
                      model=".author"
                      id="author"
                      name="author"
                      placeholder="Your name"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(15),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        required: "Required",
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 15 characters or less",
                      }}
                    />
                  </Row>
                </div>
                <div className="p-2">
                  <Row className="form-group">
                    <Label htmlFor="comment ">Comment</Label>
                    <Control.textarea
                      model=".comment"
                      id="comment"
                      name="comment"
                      rows="6"
                      className="form-control"
                    />
                  </Row>
                </div>
                <Button type="submit" value="submit" color="primary">
                  Submit
                </Button>
              </LocalForm>
            </ModalBody>
          </Modal>
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil fa-lg"></span>Submit Comment
          </Button>
        </React.Fragment>
      </div>
    );
  }
}
export default DishDetail;
