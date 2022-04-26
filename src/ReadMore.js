import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './About.css';

class ReadMore extends React.Component {
  render() {
    return (
      <>
        <Modal className="mintingNftModal" show={this.props.showModal}>
          <Modal.Header id="readmoreHeader">
            <Modal.Title>{`${this.props.devData.name}'s`} Bio</Modal.Title>
          </Modal.Header>
          <Modal.Body id="readmoreBody">{this.props.devData.bio}</Modal.Body>
          <Modal.Footer id="readmoreFooter">
            <Button
              onClick={() => {
                this.props.hideBio();
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ReadMore;
