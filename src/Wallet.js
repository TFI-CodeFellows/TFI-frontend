import React, { Component } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import axios from 'axios';
import './Wallet.css';
import { withAuth0 } from '@auth0/auth0-react';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletItem: null,
    };
  }

  handleDeleteWalletItem = async (item) => {
    console.log('deleting item');
    const { _id } = item;
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;

      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
        method: 'delete',
        baseURL: `${process.env.REACT_APP_HEROKU_URL}/wallet/${_id}`,
      };
      await axios(config).then(() => {
        this.props.getUserWallet();
      });
    }
  };
  render() {
    return (
      <Drawer
        open={this.props.showWalletDrawer}
        anchor="right"
        onClose={this.props.hideWalletDrawer}
        class={"walletDrawer"}
      >
        <h2 id="walletTitle">Wallet Items</h2>
        <div className="walletCont">
          {this.props.wallet &&
            this.props.wallet.map((item, idx) => {
              return (
                <div className="itemDiv" key={item._id}>
                  <img id="walletIMG" src={item.imageURL} alt="" />
                  <div className="itemDesc">
                    <p>Item: {idx + 1}</p>
                    <h6>{item.title}</h6>
                    <h6>Price: {item.price} ETH</h6>
                    <div id="btnDiv">
                      <button
                        id="itemBtn"
                        onClick={() => {
                          this.setState({ walletItem: item });
                          this.handleDeleteWalletItem(item);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <Button id="checkoutBtn">
          Proceed to Checkout
        </Button>
      </Drawer>
    );
  }
}

export default withAuth0(Wallet);
