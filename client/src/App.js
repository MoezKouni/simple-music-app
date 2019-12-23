import React from 'react';
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import Alerts from './components/Alerts';
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './components/PrivateRoute'


if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <div className="container">
          <Alerts />
          <Switch>
            <PrivateRoute exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
