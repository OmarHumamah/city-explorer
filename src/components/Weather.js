import React from "react";
import { ListGroup } from "react-bootstrap";
class Weather extends React.Component {
  render() {
    return (
      <>
        <ListGroup style={{ margin: "20px" }}>
          <ListGroup.Item variant="success">Date: {this.props.dayData.date}</ListGroup.Item>
          <ListGroup.Item variant="primary">
            Description: {this.props.dayData.description}
          </ListGroup.Item>
        </ListGroup>
      </>
    );
  }
}

export default Weather;
