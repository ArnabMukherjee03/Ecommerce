const express = require('express');
const {authMiddleware} = require("../middleware/authMiddleware")

const router = express.Router();

const {addToCart, fetchCartItem, deleteFromCart, updateCart} = require("../controllers/cart")

router.post('/addtocart',authMiddleware,addToCart)
      .get('/fetchcartitems',authMiddleware,fetchCartItem)
      .delete('/:id',authMiddleware,deleteFromCart)
      .patch('/:id',authMiddleware,updateCart)

exports.router = router;