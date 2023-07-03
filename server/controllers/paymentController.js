const Razorpay = require("razorpay")
const Order = require('../models/orderModel')
var rzp = new Razorpay({ key_id: 'rzp_test_tZAJTAadDARvLv', key_secret: 'DSnXed91UQQUjSPAsyt1bl7m' })
const sequelize = require('../utils/db')
const User = require("../models/userModel");

exports.purchasePremium = async (req, res) =>{
    try {
      const t = sequelizer.transaction()
        rzp.orders.create({
            amount: 50000,
            currency: "INR",
            } , { transaction: t }, (err, order) => {
              if (err) {
                console.log("asdfghjcvbnm")
                  throw new Error(JSON.stringify(err));
              }
              req.user.createOrder({orderId : order.id, status: "pending"}, { transaction: t }).then(()=>{
                t.commit()
                return res.json({order, key_id: rzp.key_id})
              })

            })
    } catch (error) {
        t.rollback()
        console.log(error)
        res.status(403).json({msg: "Something went wrong"})
    }
}


exports.updateTransaction =async (req, res) => {
  try {
    const { order_id, payment_id } = req.body;
    await Order.update({paymentId: payment_id, status: "successful"},{where : {orderId: order_id}})
    User.update({isPremiumUser:true}, {where : {email: req.user.email}})
    await res.json({ status: "successful"})
  } catch (error) {
    
  }
}