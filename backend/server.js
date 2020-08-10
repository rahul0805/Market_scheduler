const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();


let Buyer = require('./models/buyer');
let Seller = require('./models/seller');
let Products = require('./models/products');
let Bookings = require('./models/bookings');
let Cart = require('./models/cart');
//let Reviews = require('./models/reviews');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
//mongoose.connect('mongodb+srv://rahul0805:rahul0805@bioproj-jbih7.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
 mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function (req, res) {
    Seller.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Adding a new user
userRoutes.route('/buyer').post(function (req, res) {

    let send={
        status:"-1",
        msg:"temp"
    };

    //let user = new User(req.body);

    const { username, password,confirm_password ,email,phone,address,pincode} = req.body;
    if (!username || !password || !confirm_password || !email || !phone || !address || !pincode) {
        send.msg="Incomplete fields";
        send.status="2";
        res.json(send)
    }

       else if(password!=confirm_password){
        send.msg = "Password didn't match";
        send.status=1;
        res.json(send)
    }

    else if(password==confirm_password){
    Buyer.findOne({ username })
        .then(user => {
            if (user) {
                send.msg="Username exists already";
                send.status="3";
                res.json(send)
                return;
            }

            const newuser = new Buyer({
               username,
                password,
                email,
                phone,
                address,
                pincode,
                sum_ratings: 0, //default 3
                num_ratings: 0
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newuser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newuser.password = hash;
                    newuser.save()

                    send.msg="Successfully Added";
                    send.status="0";
                    res.json(send)

                })
            })
        })
    }



});


// Adding a new user
userRoutes.route('/seller').post(function (req, res) {

    let send={
        status:"-1",
        msg:"temp"
    };

    //let user = new User(req.body);

    const { username, password,confirm_password ,shopname,email,phone,address,pincode} = req.body;
    if (!username || !password || !confirm_password || !email || !phone || !address || !pincode || !shopname) {
        send.msg="Incomplete fields";
        send.status="2";
        res.json(send)
    }

        else if(password!=confirm_password){
        send.msg = "Password didn't match";
        send.status=1;
        res.json(send)
    }


    else if (password==confirm_password){
    Seller.findOne({ username })
        .then(user => {
            if (user) {
                send.msg="Username exists already";
                send.status="3";
                res.json(send)
                return;
            }

            const newuser = new Seller({
               username,
                password,
                shopname,
                email,
                phone,
                address,
                pincode,
                sum_ratings: 0, //default 3
                num_ratings: 0
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newuser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newuser.password = hash;
                    newuser.save()

                    send.msg="Successfully Added";
                    send.status="0";
                    res.json(send)

                })
            })
        })
    }

});



// Login an existing user
userRoutes.route('/login').post(function (req, res) {

    let send={
        status:"-1",
        msg:"temp",
        type:"",
        pincode:""
    };

   //const {Username,Password,user_type}=req.body;
    let Username = req.body.username;
    let Password = req.body.password;
    let user_type = req.body.user_type;

    if(user_type=='Buyer'){
    Buyer.findOne({ username: Username })
        .then(user => {
            if (!user) {
                send.msg="User does not exist";
                send.status="2";
                res.json(send)
            }

            bcrypt.compare(Password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        send.msg="Wrong password";
                        send.status="3";
                        res.json(send)
                    }

                    else{
                        send.msg="Credentials Valid";
                        send.status="0";
                        send.type=user.user_type,
                        send.pincode=user.pincode,
                        res.json(send)
                    }
                })
        })
    }
    else if(user_type=='Seller'){
        Seller.findOne({ username: Username })
        .then(user => {
            if (!user) {
                send.msg="User does not exist";
                send.status="2";
                res.json(send)
            }

            bcrypt.compare(Password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        send.msg="Wrong password";
                        send.status="3";
                        res.json(send)
                    }

                    else{
                        send.msg="Credentials Valid";
                        send.status="0";
                        send.type=user.user_type
                        res.json(send)
                    }
                })
        })
    }
});



//seller to view his products
userRoutes.route("/seller/view").post(function(req,res){

    let send={
        status:"-1",
        msg:"temp"
    };

    let {seller_name,ref} = req.body;

    // all fields need to be present
     ref = ref + ".*";
    if(!ref){
        send.status=4;
            send.msg="Not working bitch";
        res.json(send)
        return;
    }


     Products.find({name:{ $regex : ref, $options: "i" },seller_id:seller_name},function(err, product) {
        if(err) throw err;
        res.json(product);
    });



});



//seller to add product
userRoutes.route('/seller/addproduct').post(function(req,res){

    let send={
        status:"-1",
        msg:"temp"
    };

    const { name,price,company,quantity,items_left, seller_id } = req.body;

    // all fields need to be present
    if (!name || !quantity || !price || !seller_id || !items_left) {
        send.msg="Incomplete fields";
        send.status="2";
        res.json(send)
        return;
    }

    //Products.find
    Products.find({name: name,company:company,quantity: quantity, seller_name: seller_id} ,function(err,item){
        if(err){

            console.log(err);
        }
        else{

                if (!item) {
                            send.msg="Product exists already with this name registered by you - if want to update please click update button";
                            send.status="3";
                            res.json(send)
                }

                else{
                    const newitem = new Products({
                        name,
                        price,
                        company,
                        quantity,
                        items_left,
                        seller_id,
                        status:"Available"

                    });

                    newitem.save()
                     send.msg="yes bitch";
                            send.status="0";
                            res.json(send)
                            return;
                    /*send.status = 0;
                    send.msg = "Successfully Added Product";
                    res.json(msg)*/


                }
        }

    });


});

userRoutes.route("/seller/update").post(function(req,res){

    let send={
        status:"-1",
        msg:"temp"
    };

    const { id,items_left } = req.body;

    // all fields need to be present
    if (!id){
        send.msg="Incomplete fields";
        send.status="2";
        res.json(send)
    }

     Products.findOneAndUpdate({_id: id}, {$set :{"items_left": items_left}},function(err, product) {
        if (err){
            console.log(err);
            send.status=1;
            send.msg="Error in updating , try again";
            res.json(send)
        }
        else {
            //product.status="wtf";
            send.status=0;
            send.msg="Successfully updated";
            res.json(send)
        }
    });



});




//giving buyers list of seller in town
userRoutes.route('/buyer/view').post(function (req, res){
   let send={
        status:"-1",
        msg:"temp"
    };
    //let ref = "";
    let {pincode,ref}=req.body;
    ref = ref + ".*";
    if(!ref){
        send.status=4;
            send.msg="Not working bitch";
        res.json(send)
        return;
    }
    Seller.find({username:{ $regex : ref, $options: "i" },pincode:pincode},{"username" :1, "shopname":1, "phone":1, "address":1, "sum_ratings":1},function(err,users){
        if(err) throw err;
        res.json(users);
    });

});


//Buyer to view products
userRoutes.route("/buyer/products").post(function(req,res){

    let send={
        status:"-1",
        msg:"temp"
    };

    let {seller_name,ref} = req.body;

    console.log(seller_name);
    ref = ref + ".*";
    if(!ref){
        send.status=4;
            send.msg="Not working bitch";
        res.json(send)
        return;
    }

     Products.find({name:{ $regex : ref, $options: "i" },seller_id:seller_name},function(err, product) {
        if(err) throw err;
        res.json(product);
    });



});



userRoutes.route("/buyer/cart").post(function(req,res){

    let send={
        status:"-1",
        msg:"temp"
    };
    const {idi,prod_id,buyer_id,seller_id} = req.body;


 /*  const newcart = new Cart({
    		product:({id:"afafsdg",num:6969}),
    		buyer_name:buyer_id,
    		seller_id,
    		price:1233,
    		quantity_total:1,
    		status:"yo!"
    	});
    	*/
    	//res.json(newcart) ;
    	  //return;
  		        /*const newcart = new Products({
                                name:prod_id,
                                price:123,
                                quantity:13132,
                                quantity_left:1332,
                                seller_id:seller_id,
                                status:"Available"
                            });
*/

    //if(!idi){
  //  	newcart.save();
    //	     }
    //Cart.update({buyer_name:buyer_id},{$push:{product:{id:prod_id,num:696}}});
    //Cart.update({buyer_name:buyer_id},{$push:{product:{id:prod_id,num:6966}}});


        /*Cart.find({seller_id: seller_id} ,function(err,item){
        if(err){

            console.log(err);
        }
        else{

                if (!item) {
                            send.msg="Product exists already with this name registered by you - if want to update please click update button";
                            send.status="3";
                            res.json(send)
                }

                else{
                const newitem = new Cart({
    		product:[],
    		buyer_name:buyer_id,
    		seller_id,
    		price:12332,
    		quantity_total:121,
    		status:"yo bitch!"
    	});

                    newitem.save()
                     send.msg="yes bitch";
                            send.status="0";
                            res.json(newitem)
                            return;
                    //send.status = 0;
                    //send.msg = "Successfully Added Product";
                    //res.json(msg)


                }
        }

    })*/
send.msg="yes bitch";
                            send.status="10";
Cart.update({buyer_name:buyer_id},{$push:{product:{id:prod_id,num:69678}}}, function(err,cart){
 if(err) throw err;
        res.json(cart);
})





});


app.use('/', userRoutes);

app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
});
