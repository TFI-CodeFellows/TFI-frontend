import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Profile from './Profile';
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './Login';
import './Header.css';

class Home extends React.Component {
  render() {
    return (
      <Nav className="navBar">
        <Nav.Item>
          <Nav.Link href="/">
            <Image src="logo" alt="logo" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/about">About Us</Nav.Link>
        </Nav.Item>
        <Nav.Item className="separator" />
        {!this.props.auth0.isAuthenticated ? (
          <>
            <Nav.Item>
              <Nav.Link>
                <LoginButton />
              </Nav.Link>
            </Nav.Item>
          </>
        ) : (
          <>
            <Nav.Item>
              <Profile />
            </Nav.Item>
          </>
        )}
      </Nav>
    );
  }
}

export default withAuth0(Home);
