import React from 'react';
import { APICall, Method } from './helpers';
import { withAuth0 } from '@auth0/auth0-react';
import { Row, Col, Card } from 'react-bootstrap';
import Button from '@mui/material/Button'
import { IoMdTrash } from 'react-icons/io';
import { MdModeEditOutline } from 'react-icons/md';
import './nftcard.css'

type NFT = {
  title: string,
  type: string,
  imageURL: string,
  description: string,
  price: number,
  ratings: number,
  email: string,
}

type IProps = {
}

type IState = {
  nfts: NFT[],
  selected: NFT | null,
  show: boolean,
}

class Nft extends React.Component<IProps, IState> {
  APICall: any;
  constructor(props) {
    super(props)
    this.APICall = APICall.bind(this);
    this.state = {
      nfts: [],
      selected: null,
      show: false,
    }
  }

  async componentDidMount() {
    const url = `${process.env.REACT_APP_HEROKU_URL}/nft`
    const response: { data: NFT[] } = await this.APICall(Method.GET, url)
    if (response?.data) {
      this.setState({
        nfts: response.data,
      })
    }
  }

  render() {
    return (
      <div className="myNFTDiv">
        <h1>My NFTs</h1>
        <Row xs={1} sm={2} md={3} lg={3} xl={4} className='resRow'>
          {this.state.nfts.map((nft, idx) => {
            return (
              <Col key={idx}>
                <Card className='myNftCard'>
                  <Card.Img
                    className='nftImg'
                    src={nft.imageURL}
                    alt={nft.title}
                    onClick={() => {
                      console.log('hello');
                      this.setState({
                        show: true,
                        selected: nft,
                      });
                    }}
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
                  <div id="cardBtns">
                    <Button id="dltBtn" variant="contained" disableElevation>
                      <IoMdTrash /> &nbsp; Delete
                    </Button>
                    <Button id="edtBtn" variant="outlined" >
                      <MdModeEditOutline />
                      &nbsp; Edit
                    </Button>
                  </div>
                </Card>
              </Col>
            )
          })}
        </Row>
      </div >
    )
  }
}

export default withAuth0(Nft);
