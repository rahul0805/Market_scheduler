const mongoose = require('mongoose');

let Cart = new mongoose.Schema({
    product:
        {
            id: {type :String},
            num : {type : Number}
        },
    buyer_name: {
        type: String
    },
    seller_id:{
        // username
        type: String
    },
    price: {
        type: Number
    },
    quantity_total: {
        type: Number
    },
    status:{
        //update
        //Available, Placed, Dispatched, Deleted
        type: String
    }
});

module.exports = mongoose.model('Cart', Cart);
