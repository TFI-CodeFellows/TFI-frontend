import { Modal, Form } from "react-bootstrap";
import Button from '@mui/material/Button';
import './Modal.css';
import React from "react";
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import { BsFillCloudUploadFill } from "react-icons/bs";


class MintingModal extends React.Component {

  handleGetAllNft = async () => {
    const config = {
      baseURL: `${process.env.REACT_APP_HEROKU_URL}`,
      method: 'get',
    }
    const rest = await axios(config);
    console.log(rest.data);
    this.setState({ allNFT: rest.data })
  }


  handleSubmit = e => {
    e.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.append('title', e.target.title.value);
    bodyFormData.append('description', e.target.description.value);
    bodyFormData.append('price', e.target.price.value);
    bodyFormData.append('ratings', e.target.rating.value);
    bodyFormData.append('type', e.target.type.value)
    bodyFormData.append('image', e.target.image.files[0]);
    this.createNFT(bodyFormData);
  }
  createNFT = async (FormData) => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${jwt}`
        },
        baseURL: `${process.env.REACT_APP_HEROKU_URL}/nft`,
        method: 'post',
        data: FormData,
      }
      const rest = await axios(config, FormData);
      this.handleGetAllNft();
      console.log(rest.data);
    }
  }
  render() {
    return (
      <Modal className="mintingNftModal" show={this.props.modal}>
        <Form className="nftForm" onSubmit={this.handleSubmit} encType='multipart/form-data'>
          <Form.Label>Title:</Form.Label>
          <Form.Control id="input" type='text' name='title' placeholder='Title' className='title' />
          <Form.Label>Category:</Form.Label>
          <Form.Control id="input" as='select' name='type' placeholder='Category' className='Category FormSelect'>
            <option value='Category' >Select a category</option>
            <option value='Animal'>Animal</option>
            <option value='Art'>Art</option>
            <option value='Potrait'>Potrait</option>
            <option value='Landscape'>Landscape</option>
          </Form.Control>
          <Form.Label>Price:</Form.Label>
          <Form.Control id="input" type='number' placeholder='Enter Value' name='price' />
          <Form.Label>Ratings:</Form.Label>
          <Form.Control id="input" type='number' placeholder='Rate this NFT' name='rating' />
          <Form.Label>Description:</Form.Label>
          <Form.Control id="input" type='text' as='textarea' placeholder='Enter a Description' name='description' />
          <Form.Label><BsFillCloudUploadFill />&nbsp; Upload Image:</Form.Label>
          <Form.Control id="input" type='file' placeholder='Insert an Image' name='image' />
          <Button id="minNftBtn" variant="contained" type='submit' onClick={() => this.props.hideModal()}>MINT NFT</Button>
        </Form>
      </Modal>
    )
  }
}
export default withAuth0(MintingModal);
