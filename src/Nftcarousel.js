import './Nftcarousel.css';
import React, { Component } from 'react';
import NFTdetailsModal from './NFTdetailsModal';
import Carousel from 'react-elastic-carousel';
import { Card } from 'react-bootstrap';

class NFTCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNft: null,
      show: false
    }
  }

  onHide = () => {
    this.setState({ show: false });
  }

  handleClick = (nft) => {
    console.log(nft);
    this.setState({
      selectedNft: nft,
      show: true,
      onHide: this.onHide
    })
  }

  render() {
    const breakpoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 2 },
      { width: 768, itemsToShow: 3 },
      { width: 1200, itemsToShow: 4 },
    ];

    return (
      <>
        <div className="nftDiv">
          {this.props?.nftArr &&
            <Carousel className='nftCarousel' breakPoints={breakpoints}>
              {this.props?.nftArr.map((nft) => (
                <Card key={nft._id} className='myNftCard'>
                  <Card.Img
                    className='nftImgC'
                    src={nft.imageURL}
                    alt={nft.title}
                    onClick={() => this.handleClick(nft)}
                  />
                  <div id="cardDiv">
                    <div>
                      <h5 id="label">Title:</h5>
                      <h5>&nbsp;{nft.title}</h5>
                    </div>
                    <div>
                      <h5 id="label">Price:</h5>
                      <h5>&nbsp;{nft.price} ETH</h5>
                    </div>
                  </div>
                </Card>
              ))}
            </Carousel>
          }
        </div>

        {this.state.selectedNft &&
          <NFTdetailsModal
            show={this.state.show}
            nft={this.state.selectedNft}
            onHide={this.onHide}
          />}
      </>
    );
  }
}

export default NFTCarousel;
