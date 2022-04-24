import { Modal, Form, Container, Row, Col } from "react-bootstrap";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import './Modal.css';
import React from "react";
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { Undo, Redo, Delete, Brush } from "@mui/icons-material";

const CANVAS_STYLE = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
  // marginTop: '2rem',
};

class MintingModal extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef();
    this.state = {
      sketching: true,
      sketchingColor: '#1f1f1f'
    }
  }

  undoCanvas = () => {
    this.canvas.current.undo()
  }
  redoCanvas = () => {
    this.canvas.current.redo()
  }
  setColorCanvas = newHex => {
    this.setState({
      sketchingColor: newHex
    })
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
      console.log(rest.data);
    }
  }
  render() {

    return (
      <Modal
        className="mintingNftModal"
        show={this.props.modal}
        size={this.state.sketching && 'xl'}>
        <Container>
          <Row>
            <Col>
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
            </Col>
            {this.state.sketching && (
              <>
                <Col md="auto">
                  <div className="options-panel">
                    <div className="flex-row">
                      <div className="flex-col">
                        <IconButton variant="contained" onClick={this.undoCanvas}>
                          <Undo />
                        </IconButton>
                      </div>
                      <div className="flex-col">
                        <IconButton variant="contained" onClick={this.redoCanvas}>
                          <Redo/>
                        </IconButton>
                      </div>
                    </div>
                    <div className="flex-row">
                      <div className="flex-col">
                        <Button variant="outlined" className="icon-button" startIcon={<Delete />}>Erase</Button>
                      </div>
                    </div>
                    <div className="flex-row">
                      <div className="flex-col">
                        <IconButton variant="contained" id="red-ink" onClick={() => this.setColorCanvas('#e2503d')}>
                          <Brush />
                        </IconButton>
                      </div>
                      <div className="flex-col">
                        <IconButton variant="contained" id="pink-ink" onClick={() => this.setColorCanvas('#ca5db9')}>
                          <Brush />
                        </IconButton>
                      </div>
                    </div>
                    <div className="flex-row">
                      <div className="flex-col">
                        <IconButton variant="contained" id="blue-ink" onClick={() => this.setColorCanvas('#256cde')}>
                          <Brush />
                        </IconButton>
                      </div>
                      <div className="flex-col">
                        <IconButton variant="contained" id="yellow-ink" onClick={() => this.setColorCanvas('#f1f366')}>
                          <Brush />
                        </IconButton>
                      </div>
                    </div>
                    <div className="flex-row">
                      <div className="flex-col">
                        <IconButton variant="contained" id="green-ink" onClick={() => this.setColorCanvas('#82f366')}>
                          <Brush />
                        </IconButton>
                      </div>
                      <div className="flex-col">
                        <IconButton variant="contained" id="black-ink" onClick={() => this.setColorCanvas('#1f1f1f')}>
                          <Brush />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col>
                  <ReactSketchCanvas
                    id="canvas"
                    ref={this.canvas}
                    style={CANVAS_STYLE}
                    strokeWidth={4}
                    strokeColor={this.state.sketchingColor} />
                </Col>
              </>
            )}
          </Row>
        </Container>
      </Modal>
    )
  }
}
export default withAuth0(MintingModal);
