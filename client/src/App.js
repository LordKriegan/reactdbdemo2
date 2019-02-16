import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Error404 from "./pages/Err404/Error404";
import "./App.css";

class App extends Component {
  render() {
    

    
    return (
      <Router> 
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route component={Error404} />
        </Switch>
      </Router>
    );
  }
}

export default App;
