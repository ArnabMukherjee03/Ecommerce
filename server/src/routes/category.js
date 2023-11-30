const express = require('express');
const {fetchCategories,createCategory} = require("../controllers/category")
const router = express();

router.post("/",createCategory)
      .get("/",fetchCategories)

exports.router = router ;

