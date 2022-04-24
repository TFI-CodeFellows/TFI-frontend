import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { APICall } from './helpers';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import NftCarousel from './Nftcarousel';

class App extends React.Component {
  constructor(props) {
    super(props);
    APICall = APICall.bind(this);
    this.state = {
      allNFT: null,
      dailyNftData: {},
    };
  }

  componentDidMount() {
    this.handleGetAllNft()
  }
  handleGetAllNft = async () => {
    const config = {
      baseURL: `${process.env.REACT_APP_HEROKU_URL}`,
      method: 'get',
    }
    const rest = await axios(config);
    this.setState({ allNFT: rest.data })
  }

  DailyNfts() {
    return (
      <>
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
        </Carousel> 
      </>
    );
  }

  render() {
    const { DailyNfts } = this;
    return (
      <>
      {this.props.auth0.isAuthenticated &&
      this.state.allNFT && 
          <NftCarousel nftArr={this.state.allNFT}/>}
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
      </>
    );
  }
}

export default withAuth0(App);
