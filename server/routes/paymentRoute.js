const express = require('express');
const router = express();
const {checkout,paymentVerification} = require('../controllers/paymentController');

// router.post('/checkout', function(req,res){paymentController.checkout});
router.route('/checkout').post(checkout);
router.route('/paymentverification').post(paymentVerification);

module.exports = router;