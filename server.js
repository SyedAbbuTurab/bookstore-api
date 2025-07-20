const { app } = require("./index");
const connectDB = require("./db");

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server started running on port ${process.env.PORT}`);
});