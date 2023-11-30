const express = require("express");
const {createOrder,fetchOrdersByUser,deleteOrder} = require("../controllers/order")
const router = express.Router();

router
  .post("/neworder", createOrder)
  .get("/", fetchOrdersByUser)
  .delete("/:id", deleteOrder)
 
  
exports.router = router;
