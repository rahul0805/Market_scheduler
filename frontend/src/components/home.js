import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './login';
import reg_buyer from './reg_buyer';
import reg_seller from './reg_seller';
import Buyer_view from './buyer_view';
export default class Home extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Router>
      <div>
        <div class="containee">
          <h1>Social Distancing</h1>
          <h6>#STAYHOME,STAYSAFE</h6>
          <p>Make sure that you minimize human contact at all costs.</p>
        </div>
        <div className="containe">
          <div class="btn-group">
            <a href="/home/login" class="btn btn-warning" role="button">Login</a>
            <a href="/home/reg_buyer" class="btn btn-warning" role="button">Register as Buyer</a>
            <a href="/home/reg_seller" class="btn btn-warning" role="button" >Register as Seller</a>
          </div>
          <br/>
          <Route path="/home/login" component={Login}/>
          <Route path="/home/reg_buyer" component={reg_buyer}/>
          <Route path="/home/reg_seller" component={reg_seller}/>
        </div>
      </div>
      </Router>
    )
  }
}
