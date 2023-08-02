const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    razorpay_order_id:{
        type: String,
        require:true
    },
    razorpay_payment_id:{
        type: String,
        require:true
    },
    razorpay_signature:{
        type: String,
        require:true
    }

});

module.exports = mongoose.model("Payment", paymentSchema)