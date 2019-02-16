import React, { Component } from 'react';
import Login from './components/Login';
import Register from './components/Register';

import "./Home.css"
import axios from 'axios';
class Home extends Component {
    state = {
        form: "register",
        email: "",
        password: ""
    }
  
    handleSwitch = (e) => {
        e.preventDefault();
        this.setState({
            form: (this.state.form === "login") ? "register" : "login"
        })
        //this function toggles state.form back and forth between "login" and "register", which we use to conditionally render the appropriate component below
    }
    handleInputChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
        //standard handleInputChange function
    }
    gotoDash = () => {
        this.props.history.push("/dashboard");
        //Route components automatically pass certain props. .history is one of them, you can use it to redirect a user to another page.
    }
    componentDidMount() {
        const token = localStorage.getItem("loginToken"); //retrieve login token
        if (token) {// if it exists, try hitting our validateuser route.
            console.log("trying to validate user");
            axios
                .get(
                    "/api/validateuser",
                    {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    })
                .then((response) => {
                    console.log(response.data); //if the token is valid, we should get a response, so we redirect to the dashboard
                    this.gotoDash();
                })
                .catch((error) => {
                    console.error(error); //could not validate token for some reason?
                })
        }
    }
    render() {
        return (
            <> {/*this is a react fragment. it is basically an empty element. we use these when we need the one wrapper element to return but we dont want to render extra elements on the page. read more about them at https://reactjs.org/docs/fragments.html*/}
            {
                /*if state.form === login, render the login component, otherwise render the register component */
                (this.state.form === "login") ? 
                <Login email={this.state.email} password={this.state.password} handleInputChange={this.handleInputChange} handleSwitch={this.handleSwitch} gotoDash={this.gotoDash} /> : 
                <Register email={this.state.email} password={this.state.password} handleInputChange={this.handleInputChange} handleSwitch={this.handleSwitch} gotoDash={this.gotoDash} />}
            </>
        )
    }

}

export default Home;