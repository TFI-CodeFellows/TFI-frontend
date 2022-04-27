import React, { Component } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { IoIosHome } from 'react-icons/io';

class Wallet extends Component {
  render() {
    return (
      <Drawer
        open={this.props.showWalletDrawer}
        anchor="right"
        onClose={this.props.hideWalletDrawer}
      >
        <h1>Wallet drawer</h1>
        <Button href="/">
          <h5>
            <IoIosHome /> &nbsp; Home
          </h5>
        </Button>
      </Drawer>
    );
  }
}

export default Wallet;
