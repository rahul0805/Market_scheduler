import React, { Component, ReactDOM } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Buyer_view from './buyer_view.js';
export default class Login extends Component {

  constructor(props) {
      super(props);

      this.state = {
          username: '',
          password: '',
          user_type: ''
      }

      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangepassword = this.onChangepassword.bind(this);
      this.onChangeuser_type = this.onChangeuser_type.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
      localStorage.setItem("user", " ");
      // this.props.history.push("/login");
  }

  onChangeUsername(event) {
      this.setState({ username: event.target.value });
  }

  onChangepassword(event) {
      this.setState({ password: event.target.value });
  }

  onChangeuser_type(event) {
      this.setState({ user_type: event.target.value });
  }

  onSubmit(e) {
      e.preventDefault();

      const newUser = {
          username: this.state.username,
          password: this.state.password,
          user_type:this.state.user_type
      }


      axios.post('http://localhost:4000/login', newUser)
          .then(res => {
              console.log("lolol");
              if (res.data.status === "0") {
                  localStorage.setItem("user", newUser.username);
                  localStorage.setItem("pincode",res.data.pincode);
                  console.log("Hello my amigo"+res.data.pincode);
                  if(res.data.type=== "Seller"){
                      //(res.data.user_type);
                      this.props.history.push("/seller_view");
                  }
                  else{
                    console.log("you have logged in boy");
                      this.props.history.push("/buyer_view");
                  }
              }
              else{
                  console.log(res.data.user_type);
              }
          });

      this.setState({
          username: '',
          password: '',
          user_type:''
      });
    }

    render() {
        return (
          <div class="d-flex flex-column">
          <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Username: </label>
                      <input type="text"
                          className="form-control"
                          value={this.state.username}
                          onChange={this.onChangeUsername}
                      />
                  </div>

                  <div className="form-group">
                      <label>Password: </label>
                      <input type="password"
                          className="form-control"
                          value={this.state.password}
                          onChange={this.onChangepassword}
                      />
                  </div>
                  <div className="form-group">
                      <label>User Type: </label>
                      <input type="text"
                          className="form-control"
                          value={this.state.user_type}
                          onChange={this.onChangeuser_type}
                      />
                  </div>
                  <div className="form-group">
                      <input type="submit" value="Login" className="btn btn-primary" />
                  </div>
              </form>
          </div>
        )
    }
}
