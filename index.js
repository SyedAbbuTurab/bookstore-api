const server = require("express");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const dotEnv = require("dotenv").config();



const app = server();
app.use(server.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(`${req.url}, ${req.method}`);
    next();
})
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);


module.exports = {
    app
}

