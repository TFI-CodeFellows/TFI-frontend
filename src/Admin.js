import React, { Component } from 'react';
import './Admin.css';
import './WatchList.css';
import { withAuth0 } from '@auth0/auth0-react';
import ReactLoading from 'react-loading';
import Button from '@mui/material/Button';
import axios from 'axios';
import { AiOutlineMinusCircle } from "react-icons/ai";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinsWatchList: [],
            coins: null,
            myCoins: null
        }
    }


    componentDidMount() {
        this.handleGetCryptos()
        this.getCoinsWatchList();
    }

    getCoinsWatchList = async () => {
        console.log("Getting watchlist");
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();
            const jwt = res.__raw;
            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: `get`,
                baseURL: `${process.env.REACT_APP_HEROKU_URL}/crypto`
            }
            const coinRes = await axios(config)
            this.setState({ myCoins: coinRes.data })
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

    removeFromWatchlist = async (coinName) => {
        const deleteCoin = this.state.myCoins.filter((coin) => coin.name === coinName);
        const { _id } = deleteCoin[0];
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();
            const jwt = res._raw;

            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: `delete`,
                baseURL: `${process.env.REACT_APP_HEROKU_URL}`,
                url: `/crypto/${_id}`
            }
            await axios(config);
            this.handleGetCryptos()
            this.getCoinsWatchList();
        }
    }


    filterCoins = (coinRes, res) => {
        const arr = [];
        if (coinRes) {
            for (let coin of coinRes) {
                arr.push(coin.name);
            }
        }
        let crypto = res.filter(val => arr.includes(val.name));
        this.setState({ coinsWatchList: crypto });
    }



    render() {
        const userSample = [
            {
                fname: "Elon",
                lname: "Mask",
                user: true,
                admin: false,
                visits: 20
            },
            {
                fname: "Jeff",
                lname: "Bezoos",
                user: true,
                admin: false,
                visits: 1
            },
            {
                fname: "Mark",
                lname: "Zukerberg",
                user: true,
                admin: false,
                visits: 1
            },
            {
                fname: "Marc",
                lname: "Kuban",
                user: true,
                admin: false,
                visits: 1
            },
            {
                fname: "Cheryl",
                lname: "Sambern",
                user: true,
                admin: false,
                visits: 1
            },
            {
                fname: "Elizabeth",
                lname: "Holmess",
                user: true,
                admin: false,
                visits: 1
            }
        ]
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
            <div className="adminCont">
                <h1>Admin Dashboard</h1>
                <div className='adminHeader'>
                    <h5>First Name</h5>
                    <h5>Last Name</h5>
                    <h5>User</h5>
                    <h5>Admin</h5>
                    <h5>Visits</h5>
                    <h5>Remove</h5>
                </div>
                {userSample.map((user, idx) => {
                    return (
                        <div className={"adminRow"} ket={idx}>
                            <h6>{user.fname}</h6>
                            <h6>{user.lname}</h6>
                            <h6>{JSON.stringify(user.user)}</h6>
                            <h6>{JSON.stringify(user.admin)}</h6>
                            <h6 id="adminVisit">{user.visits}</h6>
                            <Button><h6><AiOutlineMinusCircle /></h6></Button>
                        </div>)
                })}
            </div>
        )
    }


}

export default withAuth0(Admin);
