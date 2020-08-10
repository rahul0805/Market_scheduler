import React, { Component, ReactDOM } from 'react';
import axios from 'axios';
import '../App.css';
export default class Buyer_view extends Component {
  constructor(props) {
       super(props);
       this.state = {lolol: []}
       this.storeuser = this.storeuser.bind(this);
   }

   componentDidMount(){
       const send={
           pincode: localStorage.getItem("pincode"),
           ref:''
       }
       axios.post('http://localhost:4000/buyer/view',send)
           .then(response => {
               this.setState({lolol: response.data});
                console.log(send.pincode);
               console.log("products");
               console.log(response.data)
           })
           .catch(function(error) {
               console.log(error);
           })
   }
   storeuser(data)
   {
     localStorage.setItem("Seller_user",data);
   }
    render() {
        return (
          <div>
          <h1>Available shops in your area</h1>
          <div className="items">
          {this.state.lolol.map((usermeh, index) => (
            <div className="itemsubs">
            <ul>
              <a href = "/buyer_view_items" key = {index} onClick={() => { this.storeuser(usermeh.username);}}><h3>ShopName:{usermeh.shopname}</h3></a>
              <li>Name of shopkeeper:{usermeh.username}</li>
              <li>Contact Shopkeeper:{usermeh.phone}</li>
            </ul>
            </div>
          ))}
          </div>
          </div>
        );
    }
}
