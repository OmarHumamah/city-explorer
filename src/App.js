import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Image, Modal, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Weather from "./Weather";

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
      date : '',
      description: "",
      stop: true
    };
  }
  handler = async (event) => {
    event.preventDefault();
    let place = event.target.place.value;
    let key = "pk.34988b0bc40a3e688d8e314c72b7b68a";
    let URL = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${place}&format=json`;
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
      console.log(this.state);
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
        <Container>
        <main class='mn'>
          
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
            <Button variant="primary" type="submit" className='mt-25'>
              Submit
            </Button>
          </Form>
          <p> City name: {this.state.placeName}</p>
          {this.state.displayMap && (
            <p>
              {this.state.placeName} is in {this.state.lat} by {this.state.lon}
            </p>
          )}
          <Row>
            <Col>
            
          {this.state.displayMap && (
            <Image
              src={`https://maps.locationiq.com/v3/staticmap?key=pk.34988b0bc40a3e688d8e314c72b7b68a&center=${this.state.lat},${this.state.lon}&zoom=${this.state.zoom}&size=600x250`}
              rounded
            />
          )}
            </Col>
          </Row>
          <Row>
            <Col>
          {this.state.displayMap && 
            <Button variant="primary" onClick={this.decrease}>
              -
            </Button>
          }
            
            </Col>
            <Col>{this.state.displayMap &&<p> Zoom </p>}</Col>
            <Col>
          {this.state.displayMap &&<Button variant="primary" onClick={this.increase}>
            +
          </Button>}
    
            </Col>
          </Row>
          
          {this.state.displayMap && <Weather place={this.state.placeName} lat={this.state.lat} lon={this.state.lon} />}
        </main>
        </Container>
        
        
        <footer>
          <span> Omar 2021 C</span>
        </footer>

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

export default App;
