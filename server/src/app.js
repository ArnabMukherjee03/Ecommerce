const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser")
const path = require('path');

// All Routers
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const UserRouter = require("./routes/user");
const addressRouter = require("./routes/address");
const orderRouter = require("./routes/order");
const categoryRouter = require("./routes/category");
const brandRouter = require("./routes/brand");
// Middlewares

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'build')));




// Routes
app.use('/auth',authRouter.router);
app.use('/product',productRouter.router);
app.use('/cart',cartRouter.router);
app.use('/user',UserRouter.router);
app.use('/address',addressRouter.router);
app.use('/order',orderRouter.router);
app.use("/category",categoryRouter.router);
app.use("/brand",brandRouter.router);

module.exports = app;