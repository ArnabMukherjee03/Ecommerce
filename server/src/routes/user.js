const express = require('express');
const { fetchUserById, updateUser } = require('../controllers/user');

const router = express.Router();

router.get("/getUser",fetchUserById)
      .patch("/update",updateUser)
     

exports.router = router;
