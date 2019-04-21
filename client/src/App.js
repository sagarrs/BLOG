import React, { Component } from 'react';
import './App.css';

import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import axios from 'axios'
import Home from "./components/layout/Home"
import Navigation from "./components/layout/Navigation"

import Story from "./components/stories/Story"
import NewStory from "./components/stories/NewStory"

import Register from "./components/authentication/Register"
import Login from "./components/authentication/Login"

import ShowStory from "./components/stories/ShowStory"
import EditStory from "./components/stories/EditStory"

class App extends Component {
  constructor(){
    super()
    this.state = {
      // isAuthenticated: false
      // not not of truthy value is true
      // not not of empty string is false coz empty string is a falsy value
      isAuthenticated: !!localStorage.getItem("token")
    }
  }

  handleIsAuthenticated = (bool) => {
    console.log(bool)
    this.setState(() => ({
      isAuthenticated: bool
    }))
  }

  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <div className="container">
            {/* <div className="float-right">
              {
                this.state.isAuthenticated && <Link className="login-reg" to="/logout">Logout</Link>
              }
              {
                !this.state.isAuthenticated && (
                  <div>
                    <Link className="login-reg" to="/register">Register</Link> &nbsp;  
                    <Link className="login-reg" to="/login">Login</Link>
                  </div>
                )
              }
        
            </div> */}

          <Switch>
            <Route path="/" component={Home} exact={true}/>
            <Route path="/stories" component={Story} exact={true}/>
            <Route path="/register" component={Register} exact={true}/>
            {/* here we r using props coz the histoy method is not available in login
            component in order to make it available we should pass props in render
            which has the history obj. Without passing props as args if we redirect 
            using "this.props.history.push" then it gives error */}
            <Route path="/login" render={(props) => {
              return (<Login {...props} handleIsAuthenticated={this.handleIsAuthenticated}/>)
            }} exact={true}/>
            <Route path="/stories/new" component={NewStory} exact={true} />
            <Route path="/stories/edit/:id" component={EditStory} exact={true} />
            <Route path="/stories/:id" component={ShowStory} exact={true} />

            <Route path="/logout" component={() => {
              localStorage.clear()
              axios.defaults.headers['x-auth'] = null
              return(
                <div>
                  <p>you have successfully logged out</p>
                  <Home/>
                </div>
              )
            }} />

              <Route path="/navigation" component={Navigation} exact={true} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
