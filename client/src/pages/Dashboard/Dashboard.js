import React, { Component } from 'react';
import axios from 'axios';
import "./Dashboard.css"
class Dashboard extends Component {
    handleLogout = (e) => {
        //removes token from localStorage, effectively logging user out, then redirects back go login page
        e.preventDefault();
        localStorage.removeItem("loginToken");
        this.props.history.push("/home");
    }

    componentDidMount() {
        const token = localStorage.getItem("loginToken"); //retrieve token from localStorage
        if (!token) { //if token doesnt exist, redirect back to home
            this.props.history.push("/home");
        } else { //otherwise try and hit user validation route
            axios
                .get(
                    "/api/validateuser",
                    {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    })
                .then((response) => {
                    console.log(response.data); //on success, do nothing
                })
                .catch((error) => {
                    console.error(error); //otherwise redirect back to home page.
                    this.props.history.push("/home");
                })
        }
    }
    render() {
        return (
            <>
                <div className="row">
                    <div className="col-sm-4 offset-sm-4">
                        <h1>Dashboard</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 offset-sm-4">
                        <button className="btn-lg btn-primary" onClick={this.handleLogout}>Log Out!</button>
                    </div>
                </div>
            </>
        )
    }

}

export default Dashboard;