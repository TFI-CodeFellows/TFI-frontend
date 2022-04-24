import React from 'react';
import LogoutButton from './Logout';
import { withAuth0 } from '@auth0/auth0-react';
import Drawer from '@mui/material/Drawer';
import Image from 'react-bootstrap/Image';
import Button from '@mui/material/Button';
import MintingModal from './MintingModal';

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drawer: false,
      modal: false,
    }
  }
  hideModal = () => {
    this.setState({modal: false})
  }

  render() {
    const showForm = () => {
      this.setState({ drawer: true })
    }
    const hideForm = () => {
      this.setState({ drawer: false })
    }
    const showModal = () => {
      this.setState({modal: true, drawer: false})
    }
    const {
      isLoading,
      isAuthenticated,
      user,
    } = this.props.auth0
    if (isLoading) {
      return <div>Loading ...</div>;
    }
    return (
      isAuthenticated && (
        <>
          <Image src={user.picture} alt={user.name} onClick={() => this.state.drawer ? hideForm() : showForm()} />
          <Drawer
            anchor='right'
            open={this.state.drawer}
            onClose={hideForm}>
            <Button onClick={showModal}>MintNFT</Button>
            <Button href="/">Home</Button>
            <Button href="/">Crypto Watch List</Button>
            <Button href="/nft">My NFTs</Button>
            <Image className='profileImage'src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <LogoutButton />
          </Drawer>
          <MintingModal modal={this.state.modal} hideModal={this.hideModal}/>
        </>
      )
    );
  }
};

export default withAuth0(Profile);
