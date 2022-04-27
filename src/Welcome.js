
import React from 'react';
import './Welcome.css';
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './Login';
import ReactLoading from 'react-loading';

class Welcome extends React.Component {

    componentDidMount() {
        console.log("Welcome");
    }


    render() {

        const {
            isLoading
        } = this.props.auth0

        if (isLoading) {
            return (
                <div id="lodingDiv">
                    <ReactLoading id="loading" type={"spokes"} color={"blue"} height={667} width={375} />
                </div>
            )
        }

        return (
            <div className="welcomeCont">
                {!this.props.auth0.isAuthenticated &&
                    <div className="welcomeDiv">
                        <div>
                            <div class='name-animation'>
                                <h1 class="typewriter">  Welcome to M3rcado</h1>
                            </div>
                            <LoginButton />
                        </div>

                        <div className="explanation">
                            <h5>M3rcado is a web 3.0 inspired application that simulates a decentralized application running on blockchain technology.<br />

                                <br />It also simulates the use of ethereum gas to facilitate e-commerce transactions of Non-Fungible Tokens (NFTs).<br />

                                <br />NFTs are unique cryptographic tokens that exist on a blockchain and cannot be replicated.<br />

                                <br />NFTs represent real-world items like artwork and real estate.<br />
                            </h5>
                        </div>
                    </div>}
            </div>
        )
    }
}

export default withAuth0(Welcome);