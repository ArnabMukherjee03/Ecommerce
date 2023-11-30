require('dotenv').config();
const express = require("express");
const app = require("./src/app");
const {connection} = require("./src/database/dbConfig.js");
const port = process.env.PORT || 8080;


connection();

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.use(express.static(path.resolve(__dirname, 'build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'),function (err) {
            if(err) {
                res.status(500).send(err)
            }
        });
    }) 
}

app.listen(port,()=>{
    console.log(`Server Running at ${port}`);
})