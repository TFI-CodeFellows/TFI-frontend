import React from 'react';
import './Home.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import NftCarousel from './Nftcarousel';
import SearchBar from "material-ui-search-bar";
import Crypto from "./Crypto.js";
import ReactLoading from 'react-loading';
import Button from '@mui/material/Button'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      coins: null,
      coinWatchList: null,
      searchType: 'NFTs',
    };
  }

  componentDidMount() {
    this.handleGetCryptos();
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
        baseURL: `${process.env.REACT_APP_HEROKU_URL}/crypto`,
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

  handleGetCryptos = async () => {
    await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        this.setState({ coins: res.data });
      })
      .catch(error => console.log(error.message));
  }
  
  render() {
    const {
      isLoading,
      isAuthenticated,
    } = this.props.auth0
    
    if (isLoading) {
      return (
        <div>
          <ReactLoading type={"spokes"} color={"purple"} height={667} width={375} />
        </div>
      )
    }
    
    const filterCondition = (nft, type) => {
      if(nft.type !== type) {
        return false;
      };
      if(this.state.searchType === 'Crypto' || !this.state.search) {
        return true;
      };
      return nft.title.toLowerCase().includes(this.state.search.toLowerCase());
    }

    const headerCondition = nftArr => {
      
    }

    const animalNFTs = this.props.allNFT.filter(nft => filterCondition(nft, 'Animal'))
    const artNFTs = this.props.allNFT.filter(nft => filterCondition(nft, 'Art'))
    const portraitNFTs = this.props.allNFT.filter(nft => filterCondition(nft, 'Portrait'))
    const landscapeNFTs = this.props.allNFT.filter(nft => filterCondition(nft, 'Landscape'))

    const noResults = !animalNFTs.length && !artNFTs.length && !portraitNFTs.length && !landscapeNFTs.length

    return (
      <div className="homeContainer">
        {isAuthenticated &&
          <>
            <div className="searchDiv">
              <SearchBar
                placeholder={`Search for ${this.state.searchType}`}
                value={this.state.search}
                id="searchBar"
                onChange={(value) => { this.setState({ search: value }) }} />
              <div>
                Search by:
              </div>
              <Button variant={this.state.searchType === 'NFTs' ? 'outlined' : 'contained'} onClick={() => {this.setState({ searchType: 'NFTs' })}}>NFTs</Button>
              <Button variant={this.state.searchType === 'Crypto' ? 'outlined' : 'contained'} onClick={() => {this.setState({ searchType: 'Crypto' })}}>Crypto</Button>
            </div>
            <div id="homeComponents">
              {(!this.state.search || this.state.searchType === 'NFTs') && (
                <>
                  {(!this.state.search || this.state.searchType === 'NFTs') && <h2>Animals</h2>}
                  {animalNFTs.length ? (
                    <NftCarousel nftArr={animalNFTs} />
                  ) : !this.state.search && <h4>No animals submitted yet :(</h4>}
                  {(!this.state.search || this.state.searchType === 'NFTs') && <h2>Art</h2>}
                  {artNFTs.length ? (
                    <NftCarousel nftArr={artNFTs} />
                  ) : !this.state.search && <h4>No art submitted yet :(</h4>}
                  {(!this.state.search || this.state.searchType === 'NFTs') && <h2>Portraits</h2>}
                  {portraitNFTs.length ? (
                    <NftCarousel nftArr={portraitNFTs} />
                  ) : !this.state.search && <h4>No portraits submitted yet :(</h4>}
                  {(!this.state.search || (this.state.searchType === 'NFTs' && !!landscapeNFTs.length)) && <h2>Landscapes</h2>}
                  {landscapeNFTs.length ? (
                    <NftCarousel nftArr={landscapeNFTs} />
                  ) : !this.state.search && <h4>No landscapes submitted yet :(</h4>}
                </>
              )}
              {(!this.state.search || this.state.searchType === 'Crypto') && (
                <Crypto
                  coins={this.state.coins}
                  search={this.state.searchType === 'Crypto' ? this.state.search : ''}
                  addToWatchList={this.addToWatchList} />
              )}
              {!!noResults && <h2>No results! Try something else...?</h2>}
            </div>
          </>}
      </div>
    );
  }
}

export default withAuth0(Home);
