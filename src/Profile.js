import React from 'react';
import './Profile.css';
import LogoutButton from './Logout';
import { withAuth0 } from '@auth0/auth0-react';
import Drawer from '@mui/material/Drawer';
import Image from 'react-bootstrap/Image';
import Button from '@mui/material/Button';
import MintingModal from './MintingModal';
import { IoMdMenu } from 'react-icons/io';
import { Card } from 'react-bootstrap';
import { MdGeneratingTokens } from 'react-icons/md';
import { SiBitcoinsv } from 'react-icons/si';
import { IoIosHome } from 'react-icons/io';
import { SiEthereum } from 'react-icons/si';
import EditDev from './EditDev';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: false,
      modal: false,
      modalDev: false,
      userDev: null,
    };
  }
  componentDidMount() {
    this.handleGetUserDev();
  }
  handleGetUserDev = async (coin) => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;

      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
        method: 'get',
        baseURL: `${process.env.REACT_APP_HEROKU_URL}/userDev`,
      };
      const rest = await axios(config);
      this.setState({ userDev: rest.data[0] });
    }
  };
  hideModal = () => {
    this.setState({ modal: false, modalDev: false });
  };
  render() {
    const showForm = () => {
      this.setState({ drawer: true });
    };
    const hideForm = () => {
      this.setState({ drawer: false });
    };
    const showModal = () => {
      this.setState({ modal: true, drawer: false });
    };
    const showDevModal = () => {
      this.setState({ modalDev: true, drawer: false });
    };
    const { isLoading, user } = this.props.auth0;
    if (isLoading) {
      return <div>Loading ...</div>;
    }
    return (
      <>
        <Button id="menu">
          <IoMdMenu
            onClick={() => (this.state.drawer ? hideForm() : showForm())}
          />
        </Button>
        <Drawer
          className="drawer"
          anchor="right"
          open={this.state.drawer}
          onClose={hideForm}
        >
          <Button id="minNftBtn" variant="contained" onClick={showModal}>
            Mint NFT
          </Button>
          <Button href="/">
            <h5>
              <IoIosHome /> &nbsp; Home
            </h5>
          </Button>
          <Button href="/watchlist">
            <h5>
              <SiBitcoinsv /> &nbsp; My Watchlist
            </h5>
          </Button>
          <Button href="/nft">
            <h5>
              <MdGeneratingTokens /> &nbsp; My NFTs
            </h5>
          </Button>
          <Image id="profileImage" src={user.picture} alt={user.name} />
          <h2>
            {user.name} &nbsp;{' '}
            <FaEdit id="editProfile" onClick={showDevModal} />
          </h2>
          <div>
            <Card id="wallet">
              <div>
                <h3 id="ether">
                  <SiEthereum />
                </h3>
                <img
                  id="etherImg"
                  src="https://res.cloudinary.com/dxg5jg10h/image/upload/v1650823993/M3RCADO-2_vq0dge.png"
                  alt=""
                />
              </div>
              <div>
                <h5>xxx-xxx-xxxx</h5>
                <p>{user.email}</p>
              </div>
            </Card>
            <div id="bottomBtns">
              <Button id="connectWallet" variant="outlined">
                Connect Wallet
              </Button>
              <LogoutButton />
            </div>
          </div>
        </Drawer>
        <MintingModal
          modal={this.state.modal}
          hideModal={this.hideModal}
          handleGetAllNft={this.props.handleGetAllNft}
        />
        {this.state.userDev && (
          <EditDev
            userDev={this.state.userDev}
            modalDev={this.state.modalDev}
            hideModal={this.hideModal}
          />
        )}
      </>
    );
  }
}

export default withAuth0(Profile);
