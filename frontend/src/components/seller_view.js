import React, { Component, ReactDOM } from 'react';
import axios from 'axios';
//import users from './user_list_test.js';
export default class Seller_view extends Component {
  constructor(props) {
      super(props);

      this.state = {
          name:'',
          price: '',
          company: '',
          quantity: '',
          items_left: '',
          seller_id: localStorage.getItem("user")
      }

      this.onChangename = this.onChangename.bind(this);
      this.onChangeprice = this.onChangeprice.bind(this);
      this.onChangecompany = this.onChangecompany.bind(this);
      this.onChangequantity = this.onChangequantity.bind(this);
      this.onChangeitems_left = this.onChangeitems_left.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }


  onChangename(event) {
      this.setState({ name: event.target.value });
  }

  onChangeprice(event) {
      this.setState({ price: event.target.value });
  }

  onChangecompany(event) {
      this.setState({ company: event.target.value });
  }

  onChangequantity(event) {
      this.setState({ quantity: event.target.value });
  }

  onChangeitems_left(event) {
      this.setState({ items_left: event.target.value });
  }

  onSubmit(e) {
      e.preventDefault();

      const newUser = {
          name: this.state.name,
          price: this.state.price,
          company: this.state.company,
          quantity: this.state.quantity,
          items_left: this.state.items_left,
          seller_id:this.state.seller_id,
      }
      console.log(newUser.user_type)

      axios.post('http://localhost:4000/seller/addproduct', newUser)
          .then(res =>{
              console.log(res.data.msg);
              alert(res.data.msg)
          });

      this.setState({
          name: '',
          price: '',
          company: '',
          quantity: '',
          items_left: '',
          seller_id: localStorage.getItem("user")
      });
  }


    render() {
        return (
          <div>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>name: </label>
                    <input type="text"
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangename}
                    />
                </div>

                <div className="form-group">
                    <label>Price: </label>
                    <input type="number"
                        className="form-control"
                        value={this.state.price}
                        onChange={this.onChangeprice}
                    />
                </div>

                <div className="form-group">
                    <label>Company: </label>
                    <input type="text"
                        className="form-control"
                        value={this.state.company}
                        onChange={this.onChangecompany}
                    />
                </div>

                <div className="form-group">
                    <label>quantity: </label>
                    <input type="number"
                        className="form-control"
                        value={this.state.quantity}
                        onChange={this.onChangequantity}
                    />
                </div>

                <div className="form-group">
                    <label>items_left: </label>
                    <input type="number"
                        className="form-control"
                        value={this.state.items_left}
                        onChange={this.onChangeitems_left}
                    />
                </div>

                <div className="form-group">
                    <input type="submit" value="Add Product" className="btn btn-primary" />
                </div>
            </form>
          </div>
        )
    }
}
