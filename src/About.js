import React from 'react';
import './About.css';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';
import { FaGithubSquare, FaLinkedin } from 'react-icons/fa';
import ReadMore from './ReadMore';
class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devs: null,
      showModal: false,
      bio: null,
    };
  }
  componentDidMount() {
    this.handleGetAllDev();
  }
  handleGetAllDev = async () => {
    const config = {
      baseURL: `${process.env.REACT_APP_HEROKU_URL}/dev`,
      method: 'get',
    };
    const res = await axios(config);
    this.setState({ devs: res.data });
    console.log(res.data);
  };

  showBio = () => this.setState({ showModal: true });
  hideBio = () => this.setState({ showModal: false });
  setBio = (bio) => this.setState({ bio });

  render() {
    return (
      <div className="aboutDiv">
        <>
          <h1 className="aboutH1">ABOUT US</h1>
          <Row xs={1} sm={2} md={3} lg={3} xl={3} className="aboutRow">
            {this.state.devs?.map((dev) => (
              <Col key={dev._id}>
                <Card className="aboutCard" key={dev._id}>
                  <Card.Img
                    className="cardImg"
                    variant="top"
                    src={dev.imageURL}
                  />
                  <Card.Body>
                    <Card.Title>{dev.name}</Card.Title>

                    <Card.Title>
                      <h6>{dev.role}</h6>
                    </Card.Title>
                    <div className="cardSocial">
                      <h2>
                        <a href={dev.github}>
                          <FaGithubSquare />
                        </a>
                      </h2>
                      <h2>
                        <a href={dev.linkedIn}>
                          <FaLinkedin />
                        </a>
                      </h2>
                    </div>
                    <div className="cardTextDiv">
                      <Card.Text className="cardText">
                        <p>{dev.bio}</p>
                      </Card.Text>
                    </div>
                    <Card.Text
                      id="read-more"
                      onClick={() => {
                        this.setBio(dev.bio);
                        this.showBio();
                      }}
                    >
                      Read More
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
        <ReadMore
          devData={this.state.bio}
          showModal={this.state.showModal}
          hideBio={this.hideBio}
        />
      </div>
    );
  }
}

export default About;
