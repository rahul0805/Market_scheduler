const mongoose = require('mongoose');

let Seller = new mongoose.Schema({
    user_type: {
      type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
  //  user_type: {
   //     type: String
   // },
    shopname:{
        type: String
    },
    email :{
        type : String
    },
    phone :{
        type: String
    },
    address:{
        type: String
    },
    pincode:{
        type:String
    },
    sum_ratings: {
        type: Number
    },
    num_ratings: {
        type: Number
    }
});

module.exports = mongoose.model('Seller', Seller);
