import React, { Component, ReactDOM } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../App.css';
//import users from './user_list_test.js';
export default class Buyer_view_items extends Component {
  constructor(props) {
       super(props);
       this.state = {lolol: [],
                     cart: [],
       }
       this.check=0;
   }

   componentDidMount(){
     console.log("hahahhahahah"+localStorage.getItem("Seller_user"))
       const send={
           seller_name: localStorage.getItem("Seller_user"),
           ref:''
       }
       axios.post('http://localhost:4000/buyer/products',send)
           .then(response => {
               this.setState({lolol: response.data});
                console.log(send.seller_name);
               console.log("products");
               console.log(response.data)
           })
           .catch(function(error) {
               console.log(error);
           })
   }
   addtocart(name,price)
   {
     for (var i=0; i < this.state.cart.length; i++) {
        if (this.state.cart[i].name === name) {
            this.state.cart[i].count +=1;
            this.check = 1;
        }
    }
    if (this.check==0)
    {
      this.state.cart.push({"name": name, "count":1});
    }
    localStorage.setItem("cart", JSON.stringify(this.state.cart));
    console.log("This is inside my storage"+JSON.parse(localStorage.getItem("cart"))[0].name)
    this.check=0;
   }
    render() {
        return (
          <div>
          <h1> Items Available in this store </h1>
          <div className="items">
          <div class="d-flex flex-column">
            {this.state.lolol.map((usermeh, index) => (
              <div className="itemsubs">
              <ul>
                <a><h3>Item Name:{usermeh.name}</h3></a>
                <li>Price:{usermeh.price}</li>
                <li>Manufacturing company:{usermeh.company}</li>
                <button onClick={() => { this.addtocart(usermeh.name,usermeh.price);}} type="button" class="btn btn-primary"> + Add to Cart</button>
              </ul>
              </div>
            ))}
            </div>
            </div>
            {console.log(this.state.cart[0])}
            <div>
            <a href="/buyer_view_items/done_shopping" class="btn btn-warning" role="button">Done Shopping</a>
            </div>
          </div>
        );
    }
}
