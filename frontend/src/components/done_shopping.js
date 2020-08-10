import React, { Component, ReactDOM } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class Done_shopping extends Component {
  constructor(props) {
       super(props);
       this.state = {lolol: []
       }
   }
   componentDidMount(){
     this.setState({lolol: JSON.parse(localStorage.getItem("cart"))});
     console.log("hahahhahahah"+localStorage.getItem("Seller_user"))
       const send={
           seller_name: localStorage.getItem("Seller_user"),
           buyer_name:  localStorage.getItem("Seller_user"),
           cart: this.state.lolol,
           ref:''
       }
       axios.post('http://localhost:4000/buyer/products',send)
           .then(response => {
             alert(response.data.slot); // response should contain the time slot
           })
           .catch(function(error) {
               console.log(error);
           })
   }
    render() {
        return (
          <div>
            <div className="items">
            {this.state.lolol.map((usermeh, index) => (
              <div className="itemsubs">
              <ul>
                <a><h3>Item you choose:{usermeh.name}</h3></a>
                <li>Number of times you chose it:{usermeh.count}</li>
              </ul>
              </div>
            ))}
            </div>
          </div>
        );
    }
}
