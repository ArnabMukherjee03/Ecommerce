const express = require('express');
const { newproduct, fetchProducts, fetchProductsbyId, updateProduct, deleteProduct } = require('../controllers/product');

const router = express.Router();

router.post('/newproduct',newproduct)
      .get('/getproducts',fetchProducts)
      .get('/getproducts/:id',fetchProductsbyId)
      .put('/update/:id',updateProduct)
      .delete('/delete/:id',deleteProduct)      

exports.router = router;


