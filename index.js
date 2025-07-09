const server = require("express");
const cors = require("cors");

const dotEnv = require("dotenv").config();



const app = server();
app.use(server.json());
app.use(cors());


module.exports = {
    app
}

