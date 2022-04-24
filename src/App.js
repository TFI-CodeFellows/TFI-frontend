import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Home from './Home'
import About from './About';
import Nft from './Nft';
import Header from './Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    const {
      isLoading
    } = this.props.auth0

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
      <>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="nft" element={<Nft />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default withAuth0(App);
