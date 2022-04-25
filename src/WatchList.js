import React, { Component } from 'react';
import './WatchList.css';
import { withAuth0 } from '@auth0/auth0-react';
import ReactLoading from 'react-loading';

class WatchList extends Component {


    componentDidMount() {
        console.log("Watch List")
    }

    render() {
        const {
            isLoading
        } = this.props.auth0

        if (isLoading) {
            return (
                <div>
                    <ReactLoading type={"spokes bubbles"} color={"blue"} height={667} width={375} />
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