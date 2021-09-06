import React from "react";

import axios from "axios";
import { Button, ListGroup, Modal } from "react-bootstrap";
class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: [],
      description: [],
      displayErr: false,
      displayRes: false
    };
  }

  show = async () => {
    let weatherURL = `https://omar-city-explorer-api.herokuapp.com/weather?searchQuery=${this.props.place}&lat=${this.props.lat}&lon=${this.props.lon}`;

    try {
      let weatherData = await axios.get(weatherURL);
      console.log(weatherData.data);
      let dateArr = [];
      let desArr = [];
      weatherData.data.forEach((n) => {
        dateArr.push(n.date);
        desArr.push(n.description);
      });
      this.setState({
        date: dateArr,
        description: desArr,
        displayRes : true
      });
    } catch {
        this.setState({
            displayErr: true,
          });
    }
  };

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.show}>
          Forecast
        </Button>
        {this.state.displayRes && (<><ListGroup>
          <ListGroup.Item variant="warning">Date: {this.state.date[0]} </ListGroup.Item>
          <ListGroup.Item variant="info">Description: {this.state.description[0]}</ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item variant="warning">Date: {this.state.date[1]} </ListGroup.Item>
          <ListGroup.Item variant="info">Description: {this.state.description[1]}</ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item variant="warning">Date: {this.state.date[2]} </ListGroup.Item>
          <ListGroup.Item variant="info">Description: {this.state.description[2]}</ListGroup.Item>
        </ListGroup></>)}
        
        {this.state.displayErr && (
          <>
            <Modal show={true}>
              <Modal.Header>
                <Modal.Title>Unable to geocode</Modal.Title>
              </Modal.Header>
              <Modal.Body>Status Code: 400, 404, 500</Modal.Body>
            </Modal>
          </>
        )}
      </>
    );
  }
}

export default Weather;
