import React from 'react';
import './About.css';
import { Card, Row, Col } from 'react-bootstrap';
import hugo from './hugo.jpeg';
import hugo1 from './Hugo1.jpeg';
import marta from './marta.jpg';
import danny from './danny.jpg';
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";


class About extends React.Component {
  render() {
    return (
      <div className='aboutDiv'>
        <h1 className='aboutH1'>ABOUT US</h1>
        <Row xs={1} sm={2} md={3} lg={3} xl={3} className='aboutRow'>
          <Col>
            <Card className='aboutCard'>
              <Card.Img className='cardImg' variant="top" src={hugo1} />
              <Card.Body>
                <Card.Title>Hugo Thompson</Card.Title>
                <div className='cardSocial'>
                  <h2><a href= "https://github.com/laptopadventure"><FaGithubSquare/></a></h2>
                  <h2><a href="https://www.linkedin.com/in/hugo-thompson-laptopadventure/"><FaLinkedin/></a></h2>
                </div>
                <div className = 'cardTextDiv'><Card.Text className='cardText'>
                  Hi, I'm Hugo Thompson, I'm a Software Engineer. I started my coding journey about halfway through high school, where I found a game that had a repository anyone could contribute to. I thought the idea of that was really cool and so I self learned a bit of the language to contribute myself. It was super fun to deliver new features, patch bugs, and rework mechanics for players and get fun positive feedback! This continued until I graduated, and while originally I was going to go ahead into college… both my enjoyment of coding and covid hitting at a real nasty time made me decide to instead continue my self learning instead of dealing with online college classes at full price. I self learned some more for about two years, branched out a little bit into python and a bit of typescript for interest, but I still felt a little unsure about fully lacking any kind of formal education, so instead I joined code fellows to become a proper software developer. I'm currently learning there to fill in the holes, learn the industry, and build connections!
                </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className='aboutCard'>
              <Card.Img className='cardImg' variant="top" src={marta} />
              <Card.Body>
                <Card.Title>Marta Deneke</Card.Title>
                <div className='cardSocial'>
                  <h2><a href="https://github.com/denekm"><FaGithubSquare/></a></h2>
                  <h2><a href="https://www.linkedin.com/in/marta-deneke/"><FaLinkedin/></a></h2>
                </div>
                <div className = 'cardTextDiv'><Card.Text className='cardText'>
                  Hello my name is Marta Deneke , I am originally from Ethiopia. I
                  received my bachelor's in MIS in 2020. Since, the pandemic had
                  just started right before my graduation I had a difficult time
                  finding a job. So I started to look into becoming a software
                  engineer and researched different boot camps. Then, I joined
                  Code Fellows in November. While attending Western Washington
                  University, I worked and volunteered at various companies in
                  order to find my true passion. As a first generation college
                  graduate I have faced different challenges to be where I am
                  today and once I land my dream job and become a Software
                  Engineer I would like to start a nonprofit in Ethiopia for young
                  women that are interested in tech but don't know where to start.
                </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className='aboutCard'>
              <Card.Img className='cardImg' variant="top" src={danny} />
              <Card.Body>
                <Card.Title>Danny Castro</Card.Title>
                <div className='cardSocial'>
                  <h2><a href="https://github.com/Dcastro99"><FaGithubSquare/></a></h2>
                  <h2><a href="https://www.linkedin.com/in/dcastro99/"><FaLinkedin/></a></h2>
                </div>
                <div className = 'cardTextDiv'><Card.Text className='cardText'>
                  Hello, my name is Danny. I recently was managing a warehouse for
                  over 5 years and decided I needed a change. For most of my life
                  I've been involved in music, be it writing, producing , and/or
                  performing. Needless to say I have a strong creative side and
                  wanted to express myself in a different medium. Software
                  development allows just that. My friend was a drummer in my band
                  and took on coding and suggested I looked into it and so I did.
                  The creative process is a lot like writing music in software
                  development. I work well with teams and love to motivate people
                  and bring them together in achieving one goal. I believe my
                  management skills along with my creative side I will be able to
                  be an asset in a team environment. Taking classes in codeFellows
                  and creating a page that I'm actually proud of has giving me the
                  drive I need to continue exploring this path.
                </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className='aboutCard'>
              <Card.Img className='cardImg' variant="top" src={hugo} />
              <Card.Body>
                <Card.Title>Cesar Deltoro</Card.Title>
                <div className='cardSocial'>
                  <h2><a href="https://github.com/cesardeltoroc"><FaGithubSquare/></a></h2>
                  <h2><a href="https://www.linkedin.com/in/cesardeltoroc/"><FaLinkedin/></a></h2>
                </div>
                <div className = 'cardTextDiv'><Card.Text className='cardText'>
                  Hello, I'm Cesar Deltoro a Software Engineer based out of Seattle, WA. My journey into tech began in 2020 and I have been able to build applications with other developers throughout the last 2 years. I am always looking to learn new skills to sharpen my technical abilities, and focused on growth with an inclusive company of which I can develop user friendly applications.
                </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className='aboutCard'>
              <Card.Img className='cardImg' variant="top" src={hugo} />
              <Card.Body>
                <Card.Title>JJ Escandor</Card.Title>
                <div className='cardSocial'>
                  <h2><a href="https://github.com/jjescandor"><FaGithubSquare/></a></h2>
                  <h2><a href="https://www.linkedin.com/in/jpescandor/"><FaLinkedin/></a></h2>
                </div>
                <div className = 'cardTextDiv'><Card.Text className='cardText'>
                  I'm a Data Scientist with background in software engineering and defense consulting leveraging over a decade of technical and consulting experience. Passionate about using code to optimize efficiency while developing creative, customer-focused solutions.
                </Card.Text>
              </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default About;
