import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Form,
  Image,
  Modal,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import Weather from "./components/Weather";
import Movies from "./components/Movies";

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
      forecastArr: [],
      moviesArr: [],
      stop: true,
    };
  }
  handler = async (event) => {
    event.preventDefault();
    let place = event.target.place.value;
    let key =
      process.env.REACT_APP_CITY_KEY || "pk.43fed3791d35ddb76aa14f749c6d3080";
    console.log(key);
    let URL = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${place}&format=json`;
    await axios.get(URL).then(async (result) => {
      this.setState({
        lat: result.data[0].lat,
        lon: result.data[0].lon,
        placeName: result.data[0].display_name,
        displayMap: true,
        forecastArr: await axios
          .get(
            `https://omar-city-explorer-api.herokuapp.com/weatherbit?city=${place}&lat=${this.state.lat}&lon=${this.state.lon}`
          )
          .then((result) => result.data),
        moviesArr: await axios
          .get(
            `https://omar-city-explorer-api.herokuapp.com/movies?search=${place}`
          )
          .then((result) => result.data),
      });
      console.log(this.state);
    });
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
              <Button style={{ margin: "9px" }} variant="primary" type="submit" className="mt-25">
                Submit
              </Button>
            </Form>
            <p> City name: {this.state.placeName}</p>
            {this.state.displayMap && (
              <p>
                {this.state.placeName} is in {this.state.lat} by{" "}
                {this.state.lon}
              </p>
            )}
            <Row>
              <Col>
                {this.state.displayMap && (
                  <Image
                    src={`https://maps.locationiq.com/v3/staticmap?key=pk.43fed3791d35ddb76aa14f749c6d3080&center=${this.state.lat},${this.state.lon}&zoom=${this.state.zoom}&size=600x250`}
                    rounded
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                {this.state.displayMap && (
                  <Button variant="primary" onClick={this.decrease}>
                    -
                  </Button>
                )}
              </Col>
              <Col>{this.state.displayMap && <p> Zoom </p>}</Col>
              <Col>
                {this.state.displayMap && (
                  <Button variant="primary" onClick={this.increase}>
                    +
                  </Button>
                )}
              </Col>
            </Row>

            {this.state.forecastArr.map((day) => {
              return <Weather dayData={day} />;
            })}
            <Row lg={4}>
              {this.state.moviesArr.map((movies) => {
                return <Movies searchedMovies={movies} />;
              })}
            </Row>
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
