const mongoose = require('mongoose');

let Buyer = new mongoose.Schema({
  user_type: {
    type: String
  },
    username: {
        type: String
    },
    password: {
        type: String
    },
    //user_type: {
//    type: String
  //  },
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

module.exports = mongoose.model('Buyer', Buyer);
