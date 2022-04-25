import React from 'react';
import './Home.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import NftCarousel from './Nftcarousel';
import SearchBar from "material-ui-search-bar";
import Crypto from "./Crypto.js";
import ReactLoading from 'react-loading';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyNftData: {},
      search: "",
      coins: null,
      coinWatchList: null
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
    const res = await axios(config);
    console.log(res.data);
    this.setState({ allNFT: res.data })
  }

  addToWatchList = async (coin) => {
    const coinData = { name: coin }
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      console.log("res", res);
      const jwt = (res.__raw);
      console.log("token: ", jwt);

      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: "post",
        baseURL: `http://localhost:3001/crypto`,
        data: coinData
      }

      await axios(config)
    }
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

    const {
      isLoading
    } = this.props.auth0

    if (isLoading) {
      return (
        <div>
          <ReactLoading type={"spokes"} color={"purple"} height={667} width={375} />
        </div>
      )
    }

    return (
      <div className="homeContainer">
        {this.props.auth0.isAuthenticated &&
          <>
            <SearchBar
              value={this.state.search}
              id="searchBar"
              onChange={(value) => { this.setState({ search: value }) }}
            />
            <div id="homeComponents">
              {this.state.allNFT &&
                <NftCarousel nftArr={this.state.allNFT} />}

              {this.state.allNFT &&
                <NftCarousel nftArr={this.state.allNFT} />}

              {this.state.allNFT &&
                <NftCarousel nftArr={this.state.allNFT} />}

              <Crypto
                coins={this.state.coins}
                search={this.state.search}
                addToWatchList={this.addToWatchList}
              />
            </div>
          </>}
      </div>
    );
  }
}

export default withAuth0(Home);
