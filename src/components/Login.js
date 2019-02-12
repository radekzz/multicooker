import React, { Component, useState } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    handleClick(event) {
        var apiBaseUrl = "http://localhost:4000/users/";
        var self = this;
        var payload = {
            "username": this.state.username,
            "password": this.state.password
        }
        axios.post(apiBaseUrl + 'login', payload)
            .then((response) => {
                console.log(response);
                const cookies = new Cookies();
                if (response.data.isAuthenticated === true) {
                    console.log("Login successfull");
                    console.log()
                    cookies.set('user', response.data.user, { path: '/', expires: new Date(Date.now() + 2592000) });
                    cookies.set('isAuthenticated', true, { path: '/', expires: new Date(Date.now() + 2592000) });
                    console.log(cookies.get('user'));
                    this.setState({ isLoggedIn: true })
                    this.props.isAuth();
                } else {
                    console.log("Username or Password doesn't match");
                    cookies.set('user', response.data.user, { path: '/', expires: new Date(Date.now() + 2592000) });
                    cookies.set('isAuthenticated', false, { path: '/', expires: new Date(Date.now() + 2592000) });
                    console.log(cookies.get('user'));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to='/index' />
        } else {
            return (
                <div>
                    <MuiThemeProvider>
                        <div>
                            <AppBar
                                title="Login"
                            />
                            <TextField
                                required
                                hintText="Enter your Username"
                                floatingLabelText="Username"
                                onChange={(event, newValue) => this.setState({ username: newValue })}
                            />
                            <br />
                            <TextField
                                required
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={(event, newValue) => this.setState({ password: newValue })}
                            />
                            <br />
                            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                        </div>
                    </MuiThemeProvider>
                </div>
            );
        }
    }
}
const style = {
    margin: 15,
};
export default Login;