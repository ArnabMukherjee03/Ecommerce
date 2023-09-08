const express = require('express');
const { signup,login, logout, isAuthenticated } = require('../controllers/auth');

const router = express.Router();


router.post("/signup",signup)
      .post('/login',login)
      .get('/logout',logout)
      .get('/isAuth',isAuthenticated)



exports.router = router;