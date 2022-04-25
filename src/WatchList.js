import React, { Component } from 'react';
import './WatchList.css';
import { withAuth0 } from '@auth0/auth0-react';
import ReactLoading from 'react-loading';
import axios from 'axios';

class WatchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinsWatchList: null
        }
    }


    componentDidMount() {
        this.getCoinsWatchList();
    }

    getCoinsWatchList = async () => {
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();
            console.log("res", res);
            const jwt = res.__raw;
            console.log('token: ', jwt);

            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: `get`,
                baseURL: `${process.env.REACT_APP_URL}`,
                url: `/crypto`
            }

            const coinRes = await axios(config);
            console.log(coinRes.data)
            this.setState({ coinsWatchList: coinRes.data });
        }
    }

    handleDeleteCoin = async (coin) => {
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();
            console.log("res", res);
            const jwt = res._raw;
            console.log('token: ', jwt);

            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: `delete`,
                baseURL: `${process.env.REACT_APP_URL}`,
                url: `/crypto/${coin._id}`
            }

            const coinRes = await axios(config);
            console.log("Books from DB: ", coinRes.data);
            this.getCoinsWatchList();

        }
    }

    render() {
        const {
            isLoading
        } = this.props.auth0

        if (isLoading) {
            return (
                <div>
                    <ReactLoading type={"spokes"} color={"blue"} height={667} width={375} />
                </div>
            )
        }

        return (
            <div className="watchLstCont">
                <h1>My WatchList</h1>
            </div>
        )
    }


}

export default withAuth0(WatchList);