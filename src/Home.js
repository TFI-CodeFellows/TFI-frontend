import React from 'react';
import './Home.css';
import { Container, Row, Col } from 'react-bootstrap';
import { APICall } from './helpers';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import NftCarousel from './Nftcarousel';
import SearchBar from "material-ui-search-bar";
import Crypto from "./Crypto.js";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.APICall = APICall.bind(this);
    this.state = {
      dailyNftData: {},
      search: "",
      coins: null
    };
  }

  componentDidMount() {
    this.handleGetAllNft()
    this.handleGetCryptos();
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
      <></>
    );
  }

  handleGetCryptos() {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        this.setState({ coins: res.data });
        console.log(res.data);
      })
      .catch(error => console.log(error.message));
  }

  render() {
    const { DailyNfts } = this;
    return (
      <div className="homeContainer">
        {this.props.auth0.isAuthenticated &&
          <SearchBar
            value={this.state.search}
            id="searchBar"
            onChange={(value) => { this.setState({ search: value }) }}
          />}

        {this.props.auth0.isAuthenticated &&
          this.state.allNFT &&
          <NftCarousel nftArr={this.state.allNFT} />}

        {this.props.auth0.isAuthenticated &&
          this.state.allNFT &&
          <NftCarousel nftArr={this.state.allNFT} />}

        {this.props.auth0.isAuthenticated &&
          this.state.allNFT &&
          <NftCarousel nftArr={this.state.allNFT} />}

        {this.props.auth0.isAuthenticated &&
          <Crypto
            coins={this.state.coins}
            search={this.state.search}
          />}
        {!this.props.auth0.isAuthenticated &&
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
          </Container>}
      </div>
    );
  }
}

export default withAuth0(Home);
