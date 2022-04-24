import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import { APICall, GET } from './helpers';
import { withAuth0 } from '@auth0/auth0-react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.APICall = APICall.bind(this);
    this.state = {
      dailyNftData: {},
    };
  }

  componentDidMount() {
    const url = `weneedthis`;
    const response = this.APICall(GET, url);
    if (response.data) {
      this.setState({
        dailyNftData: response.data,
      });
    }
  }

  DailyNfts() {
    return (
      <Carousel className="daily-nfts">
        <Carousel.Item>
          <img
            className="d-block w-100 daily-img"
            src="https://via.placeholder.com/620x480"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 daily-img"
            src="https://via.placeholder.com/620x480"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 daily-img"
            src="https://via.placeholder.com/620x480"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }

  render() {
    const { DailyNfts } = this;
    return (
      <Container className="mt-5">
        <Row className="mb-5">
          <Col className="welcome">
            <DailyNfts />
          </Col>
        </Row>
        <Row>
          <Col className="explanation">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withAuth0(Home);
