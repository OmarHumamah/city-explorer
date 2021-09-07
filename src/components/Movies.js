import React from "react";
import { Card, ListGroup, ListGroupItem,Col } from "react-bootstrap";

class Movies extends React.Component {
  render() {
    return (
      <><Col>
        <Card style={{ width: "18rem" },{ margin: "5px" }}>
          <Card.Img variant="top" src={this.props.searchedMovies.image_url} />
          <Card.Body>
            <Card.Title>{this.props.searchedMovies.title}</Card.Title>
            <Card.Text>{this.props.searchedMovies.overview}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              Released on: {this.props.searchedMovies.released_on}
            </ListGroupItem>
            <ListGroupItem>
              Popularity: {this.props.searchedMovies.popularity}
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Subtitle>
              Average votes: {this.props.searchedMovies.average_votes}
            </Card.Subtitle>
            <Card.Subtitle>
              Total votes: {this.props.searchedMovies.total_votes}
            </Card.Subtitle>
          </Card.Body>
        </Card>
        </Col>
      </>
    );
  }
}

export default Movies;
