const express = require('express');
const {fetchBrand,createBrand} = require("../controllers/brand")
const router = express();

router.post("/",createBrand)
      .get("/",fetchBrand)

exports.router = router ;

