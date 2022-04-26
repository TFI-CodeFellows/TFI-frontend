import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class ReadMore extends React.Component {
  render() {
    return (
      <>
        <Modal className="mintingNftModal" show={this.props.showModal}>
          <Modal.Header>
            <Modal.Title>Profile Bio</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.devData}</Modal.Body>
          <Modal.Footer>
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
