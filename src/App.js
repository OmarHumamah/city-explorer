import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Image, Modal } from "react-bootstrap";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lon: "",
      placeName: "",
      displayErr: false,
      displayMap: false,
      zoom: 12,
      stop : true
    };
  }
  handler = async (event) => {
    event.preventDefault();
    let place = event.target.place.value;
    let key = "pk.0dd875258df1a0fba7e09164feca3b48";
    let URL = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${place}&format=json`;
    console.log(this.state);
    try {
      let recData = await axios.get(URL);
      this.setState({
        lat: recData.data[0].lat,
        lon: recData.data[0].lon,
        placeName: recData.data[0].display_name,
        displayMap: true,
      });
    } catch {
      this.setState({
        displayErr: true,
      });
    }
  };
  increase = () => {
    this.setState({
      zoom: this.state.zoom + 1,
    });
  };
  decrease = () => {
    this.setState({
      zoom: this.state.zoom - 1,
    });
  };
  render() {
    return (
      <>
        <header>
          <h1>City Explorer </h1>
        </header>

        <main>
          <h3>Find the location you want:-</h3>
          <Form onSubmit={this.handler}>
            <Form.Group controlId="formGridEmail">
              <Form.Label>Enter the place:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Amman, zarqa, new york .etc"
                name="place"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <p> City name: {this.state.placeName}</p>
          {this.state.displayMap && (
            <p>
              {this.state.placeName} is in {this.state.lat} by {this.state.lon}
            </p>
          )}
          {this.state.displayMap && (
            <Image
              src={`https://maps.locationiq.com/v3/staticmap?key=pk.0dd875258df1a0fba7e09164feca3b48&center=${this.state.lat},${this.state.lon}&zoom=${this.state.zoom}&size=600x250`}
              rounded
            />
          )}
          {this.state.zoom && 

          <Button variant="primary" onClick={this.decrease}>
            -
          </Button>
          }
          <Button variant="primary" onClick={this.increase}>
            +
          </Button>
        </main>
        <footer>
          <span> Omar 2021 C</span>
        </footer>

        {this.state.displayErr && <><Modal show={true}>
        <Modal.Header >
          <Modal.Title>Unable to geocode</Modal.Title>
        </Modal.Header>
        <Modal.Body>Status Code: 400, 404, 500</Modal.Body>
      </Modal></>}
      </>
    );
  }
}

export default App;
