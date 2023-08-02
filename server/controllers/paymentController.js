require('dotenv').config();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/paymentModel')

const instance = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_API_SECRECT })

const checkout = async (req, res) => {

    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR"

    }
    const order = await instance.orders.create(options, (err, order) => {
        if (!err) {

            res.status(200).json({
                success: true,
                order,
            });
        } else {
            console.log(err);
            res.status(500).send({ success: false, msg: 'Somthing went wrong' })
        }
    })

}

const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRECT)
        .update(body.toString())
        .digest("hex");


    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
    // Database comes here

    const newOrder = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    });
         await newOrder.save();

        res.redirect(
            `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
        );
    } else {
        res.status(400).json({
            success: false,
        });
    }
}

module.exports = { checkout, paymentVerification };