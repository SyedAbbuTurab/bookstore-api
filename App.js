const server = require("express");
const cors = require("cors");
const dotEnv = require("dotenv").config();


const app = server();
app.use(server.json());
app.use(cors);

app.use('/', (req, res) => {
    return 'Hello World!'
})

app.listen(process.env.PORT, () =>{
    console.log(`Server started running on port ${process.env.PORT}`);
})