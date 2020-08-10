import React, { Component, ReactDOM } from 'react';
import axios from 'axios';
//import users from './user_list_test.js';
export default class Buyer_view_items extends Component {
  constructor(props) {
       super(props);
       this.state = {lolol: []}
   }

   componentDidMount(){
       const send={
           user: localStorage.getItem("user")
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
    render() {
        return (
          <div>
          {this.state.lolol.map((usermeh, index) => (
            <ul>
              <a href="/buyer_view_items"><h1>{usermeh.username}</h1></a>
              <li>{usermeh.shopname}</li>
              <li>{usermeh.phone}</li>
            </ul>
          ))}
          </div>
        );
    }
}
