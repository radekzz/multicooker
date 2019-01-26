// App.js

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Create from './components/Create';
import Edit from './components/Edit';
import Index from './components/Index';
import Register from './components/Register';
import Login from './components/Login';
import Loginscreen from './components/Loginscreen'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginPage: [],
      uploadScreen: []
    }
  }
  componentWillMount() {
    var loginPage = [];

    loginPage.push(<Loginscreen parentContext={this} />);
    this.setState({
      loginPage: loginPage,
      isLoggedIn: false
    })

    const cookies = new Cookies();
    const auth = cookies.get('isAuthenticated');
    if (auth === "true") {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  handleClick(event) {
    const cookies = new Cookies();
    const auth = cookies.get('isAuthenticated');
    if (auth === "true") {
      this.setState({ isLoggedIn: false });
      cookies.remove('user');
      cookies.remove('isAuthenticated');
    } else {
      console.log("User is not logged in anyway");
    }
  }
  render() {
    const cookies = new Cookies();
    let loginLogout;
    if (this.state.isLoggedIn) {
      const userData = cookies.get('user');
      loginLogout = <li className="nav-item"><Link to={'/login'} className="nav-link" onClick={(event) => this.handleClick(event)}>Logout</Link></li>;
    } else {
      loginLogout = <React.Fragment><li className="nav-item">
        <Link to={'/register'} className="nav-link">Register</Link>
      </li>
        <li className="nav-item">
          <Link to={'/login'} className="nav-link">Login</Link>
        </li></React.Fragment>;
    }

    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">React CRUD Example</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/index'} className="nav-link">Index</Link>
                </li>
                <li className="nav-item">
                  |
                </li>
                {loginLogout}
              </ul>
            </div>
          </nav> <br />
          <h2>Welcome to React CRUD Tutorial</h2> <br />
          <br />
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path='/index' component={Index} />
            <Route exact path='/create' component={Create} />
            <Route path='/edit/:id' component={Edit} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
