const router = require("router")
const express = require("express")
const {app} = require("./index")

app.listen(process.env.PORT, () =>{
    console.log(`Server started running on port ${process.env.PORT}`);
})