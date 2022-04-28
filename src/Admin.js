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
            users: null
        }
    }

    componentDidMount() {
        this.handleGetAllUsers()
    }

    handleGetAllUsers = async () => {
        console.log(this.props.auth0)
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();
            const jwt = res.__raw;

            const config = {
                headers: { Authorization: `Bearer ${jwt}` },
                baseURL: `${process.env.REACT_APP_HEROKU_URL}/usersList`,
                method: 'get',
            };
            await axios(config)
                .then(response => {
                    console.log(response.data)
                    this.setState({ users: response.data })
                })
        }
    };
    handleDeleteUser = async (user) => {
        const { _id } = user;
        console.log(_id);
        console.log('deleting user');
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();
            const jwt = res._raw;

            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: `delete`,
                baseURL: `${process.env.REACT_APP_HEROKU_URL}/deleteUser/${_id}`
            }
            console.log('about to delete user beofre await');
            await axios(config);
            this.handleGetAllUsers()
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
                {this.state.users?.map((user, idx) => {
                    return (
                        <div className={"adminRow"} key={idx}>
                            <h6>{user.fName}</h6>
                            <h6>{user.lName}</h6>
                            <h6>{JSON.stringify(user.user)}</h6>
                            <h6>{JSON.stringify(user.admin)}</h6>
                            <h6 id="adminVisit">{user.visits}</h6>
                            <Button onClick={() => {this.handleDeleteUser(user)}}><h6><AiOutlineMinusCircle /></h6></Button>
                        </div>)
                })}
            </div>
        )
    }


}

export default withAuth0(Admin);
