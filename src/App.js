
import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import ReactLoading from 'react-loading';
import Home from './Home'
import About from './About';
import Nft from './Nft';
import Header from './Header';
import Crypto from './Crypto';
import WatchList from './WatchList';
import Welcome from './Welcome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

class App extends React.Component {
  render() {

    const {
      isLoading
    } = this.props.auth0

    if (isLoading) {
      return (
        <div id="lodingDiv">
          <ReactLoading id="loading" type={"spokes"} color={"blue"} height={667} width={375} />
        </div>
      )
    }

    return (
      <>
        <Header />
        <BrowserRouter>
          <Routes>
            {!this.props.auth0.isAuthenticated ?
              <Route path="/" element={<Welcome />} />
              :
              <>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="crypto" element={<Crypto />} />
                <Route path="nft" element={<Nft />} />
                <Route path="watchlist" element={<WatchList />} />
              </>
            }
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default withAuth0(App);

