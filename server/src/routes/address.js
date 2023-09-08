const express = require('express');
const { newAddress, updateAddress, getAddress, deleteAddress } = require('../controllers/address');

const router = express.Router();

router.post("/addAddress",newAddress)
      .patch("/:id",updateAddress)
      .get("/getAddress",getAddress)
      .delete("/:id",deleteAddress)

exports.router = router;