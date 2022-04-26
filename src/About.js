import React from 'react';
import './About.css';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";



class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dev: null,
    }
  }
  componentDidMount() {
    this.handleGetAllDev();
  }
  handleGetAllDev = async () => {
    const config = {
      baseURL: `${process.env.REACT_APP_HEROKU_URL}/dev`,
      method: 'get',
    }
    const res = await axios(config);
    this.setState({ dev: res.data })
  }
  render() {
    return (
      <div className='aboutDiv'>
        <><h1 className='aboutH1'>ABOUT US</h1><Row xs={1} sm={2} md={3} lg={3} xl={3} className='aboutRow'>
            {this.state.dev?.map((dev) => (
              <Col key={dev._id}>
                <Card className='aboutCard' key={dev._id}>
                  <Card.Img className='cardImg' variant="top" src={dev.imageURL} />
                  <Card.Body>
                    <Card.Title>{dev.name}</Card.Title>
                    <div className='cardSocial'>
                      <h2><a href={dev.github}><FaGithubSquare /></a></h2>
                      <h2><a href={dev.linkedIn}><FaLinkedin /></a></h2>
                    </div>
                    <div className='cardTextDiv'><Card.Text className='cardText'>
                      {dev.bio}
                    </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row></>
      </div>
    )
  }
}

export default About;
