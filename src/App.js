import React, { Component, Fragment } from 'react';
import Routes from "./Routes";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import './App.css';

import { Auth } from "aws-amplify";

class App extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount(){
    try{
     await Auth.currentSession();
      this.userHasAuthenticated(true);
    } 
    catch (e) {
      if(e !== 'No current user'){
        alert(e);
      }
    }

    this.setState({isAuthenticating: false});
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    this.userHasAuthenticated(false);
  }

  render() {

    const childProps = {
      isAuthenticated: this.state.isAuthenticated, // state boolean
      userHasAuthenticated: this.userHasAuthenticated // fn
    };

    return (
      !this.state.isAuthenticating && // not sure what this line is for?!
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/"> Scratch </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>

            {
              this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                : 
                <Fragment>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
            }

            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default App;
