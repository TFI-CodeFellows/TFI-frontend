import React from "react";
import { Modal, Form } from 'react-bootstrap'
import { Button } from "@mui/material";
import { BsFillCloudUploadFill } from "react-icons/bs";


class EditDev extends React.Component {
  render() {
    return (
      <>
        <Modal className="mintingNftModal" show={this.props.modalDev}>
          <Form className="nftForm" onSubmit={this.handleSubmit} encType='multipart/form-data'>
            <Form.Label>Name:</Form.Label>
            <Form.Control id="input" type='text' name='name' placeholder='Name' className='name' />
            <Form.Label>Bio:</Form.Label>
            <Form.Control id="input" type='text'as='textarea' placeholder='Enter Bio' name='Bio' />
            <Form.Label>linkedIn:</Form.Label>
            <Form.Control id="input" type='text' placeholder='Enter LinkedIn URL' name='linkedIn' />
            <Form.Label>Github:</Form.Label>
            <Form.Control id="input" type='text' placeholder='Enter Github URL' name='github' />
            <Form.Label><BsFillCloudUploadFill />&nbsp; Upload Image:</Form.Label>
            <Form.Control id="input" type='file' placeholder='Insert an Image' name='image' />
            <Button style={{marginTop: '10px'}}id="editDevClose" variant="contained" type='submit' onClick={() => this.props.hideModal()}>Update Information</Button>
          </Form>
        </Modal>
      </>
    )
  }
}
export default EditDev;
