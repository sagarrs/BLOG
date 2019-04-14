// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;



import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import Home from "./components/layout/Home"
import Story from "./components/stories/Story"
import NewStory from "./components/stories/NewStory"

import Register from "./components/authentication/Register"
import Login from "./components/authentication/Login"

import ShowStory from "./components/stories/ShowStory"
import EditStory from "./components/stories/EditStory"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
            <div className="float-right">
              <Link className="login-reg" to="/register">Register</Link> &nbsp;   
              <Link className="login-reg" to="/login">Login</Link>
            </div>

          <Switch>
            <Route path="/" component={Home} exact={true}/>
            <Route path="/stories" component={Story} exact={true}/>
            <Route path="/register" component={Register} exact={true}/>
            <Route path="/login" component={Login} exact={true}/>
            <Route path="/stories/new" component={NewStory} exact={true} />
            <Route path="/stories/edit/:id" component={EditStory} exact={true} />
            <Route path="/stories/:id" component={ShowStory} exact={true} />
        
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
