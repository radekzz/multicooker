import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            paypal: '',
            email: '',
            password: '',
            referral: '',
            money: 0
        }
    }
    handleClick(event) {
        event.preventDefault();
        var apiBaseUrl = "http://localhost:4000/users/";
        //To be done:check for empty values before hitting submit
        var self = this;
        var payload = {
            "username": this.state.username,
            "paypal": this.state.paypal,
            "email": this.state.email,
            "password": this.state.password,
            "referral": this.state.referral,
            "money": this.state.money
        }
        axios.post(apiBaseUrl + '/register', payload)
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    console.log("Registration successfull");
                } else {
                    console.log("Username already exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {

        return (
            <div>
                <MuiThemeProvider>
                    <form onSubmit={(event) => this.handleClick(event)}>
                        <AppBar
                            title="Register"
                        />
                        <TextField
                            required
                            hintText="Enter your username"
                            type="text"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({ username: newValue })}
                        />
                        <br />
                        <TextField
                            required
                            hintText="Enter your Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange={(event, newValue) => this.setState({ email: newValue })}
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
                        <TextField
                            hintText="Enter your referral username"
                            type="text"
                            floatingLabelText="Referral"
                            onChange={(event, newValue) => this.setState({ referral: newValue })}
                        />
                        <br />
                        <RaisedButton label="Submit" type="submit" primary={true} style={style} />
                    </form>
                </MuiThemeProvider>
            </div >
        );
    }
}
const style = {
    margin: 15,
};
export default Register;