require('dotenv').config();
const app = require("./src/app");
const {connection} = require("./src/database/dbConfig.js");
const port = process.env.PORT || 8080;

connection();

app.listen(port,()=>{
    console.log(`Server Running at ${port}`);
})