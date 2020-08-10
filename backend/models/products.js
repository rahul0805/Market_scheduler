const mongoose = require('mongoose');

let Products = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number 
    },
    company: {
        type: String
    },
    quantity:{
        type:Number
    },
    items_left: {
        type: Number
    },
    seller_id:{
        // username
        type: String
    },
    status:{
        //Available, Placed, Dispatched, Deleted
        type: String
    }
});

module.exports = mongoose.model('Products', Products);