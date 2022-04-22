import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Image  from 'react-bootstrap/Image';
import Profile from './Profile';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
    }
  }
  render() {
    return (
      <Nav className='p-3 header-nav'>
        <Nav.Item>
          <Nav.Link to="/"><Image src="logo" alt="logo" /></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/about">About Us</Nav.Link>
        </Nav.Item>
        <Nav.Item className="separator" />
        {!this.state.isAuthenticated ? (
          <>
            <Nav.Item>
              <Nav.Link>Log in!</Nav.Link>
            </Nav.Item>
          </>
        ) : (
          <>
            <Nav.Item>
              Search
            </Nav.Item>
            <Nav.Item>
              <Profile />
            </Nav.Item>
          </>
        )}
      </Nav>
    )
  }
}

export default Home;




