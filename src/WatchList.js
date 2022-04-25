import React, { Component } from 'react';
import './WatchList.css';
import { withAuth0 } from '@auth0/auth0-react';
import ReactLoading from 'react-loading';
import axios from 'axios';

class WatchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinsWatchList: null,
            coins: null
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
                baseURL: `${process.env.REACT_APP_URL}/crypto`
            }
            const coinRes = await axios(config)
            this.setState({ coinsWatchList: coinRes.data });
            this.handleGetCryptos(coinRes.data);
        }
    }

    handleGetCryptos = async (coinRes) => {
        await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(res => {
                this.setState({ coins: res.data });
                this.filterCoins(coinRes, res.data);
            })
            .catch(error => console.log(error.message));
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

    filterCoins = (coinRes, res) => {
        const arr = [];
        let a = {};
        for (let coin of res) {
            a = res.filter(val => {
                return val.name === coin.name;
            })
        }
        console.log(a);
        console.log(arr);
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