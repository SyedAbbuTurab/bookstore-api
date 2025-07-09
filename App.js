const server = require("express");
const cors = require("cors");

const dotEnv = require("dotenv").config();



const app = server();
app.use(server.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT, () =>{
    console.log(`Server started running on port ${process.env.PORT}`);
})