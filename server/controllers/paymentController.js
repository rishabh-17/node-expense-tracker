const Razorpay = require("razorpay")
const Order = require('../models/orderModel')
var rzp = new Razorpay({ key_id: 'rzp_test_JgZil736cVGykM', key_secret: 'TJGPCwHi6Ctq9GrJcwtDw34v' })

exports.purchasePremium = async (req, res) =>{
    try {
        rzp.orders.create({
            amount: 50000,
            currency: "INR",
            }, (err, order) => {
              if (err) {
                console.log("asdfghjcvbnm")
                  throw new Error(JSON.stringify(err));
              }
              req.user.createOrder({orderId : order.id, status: "pending"}).then(()=>{
                return res.json({order, key_id: rzp.key_id})
              })

            })
    } catch (error) {
        console.log(error)
        res.status(403).json({msg: "Something went wrong"})
    }
}


exports.updateTransaction = (req, res) => {
  try {
    const { orderId, paymentId} = req.body;
    Order.update({paymentId: paymentId, status: "successful"},{where : {orderId: orderId}})
  } catch (error) {
    
  }
}