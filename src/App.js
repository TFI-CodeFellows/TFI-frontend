
import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Home from './Home'
import About from './About';
import Nft from './Nft';
import Header from './Header';
import Crypto from './Crypto';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

class App extends React.Component {
  render() {

    return (
      <>
        <Header />
        <BrowserRouter>
          <Routes>
            {!this.props.auth0.isAuthenticated ?
              <Route path="/" element={<Home />} />
              : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="crypto" element={<Crypto />} />
                  <Route path="nft" element={<Nft />} />
                </>
              )}s
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default withAuth0(App);

