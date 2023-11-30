const { Order } = require("../models/orderModel");
const { Product } = require("../models/productModel");
const { getDataFromToken } = require("../helpers/getData");

exports.createOrder = async (req, res) => {
  try {
    const id = getDataFromToken(req);
    const data = await req.body;
    const newOrder = new Order({ ...data , user: id });

    for (let item of newOrder.items) {
      let product = await Product.findOne({ _id: item.productId._id });
      product.$inc("stock", -1 * item.quantity);
      await product.save();
    }

    const order = await newOrder.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.fetchOrdersByUser = async (req,res)=>{
  try {
     const id = getDataFromToken(req);
     const orders = await Order.find({user: id});
     res.status(201).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.deleteOrder = async (req,res)=>{
  try {
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}