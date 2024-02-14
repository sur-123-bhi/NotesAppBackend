const express = require("express");
require("dotenv").config();
const {connection} = require("./config/db");
const {userRouter} = require('./routes/user.route');
const {noteRouter} = require('./routes/note.route');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/notes', noteRouter);

app.listen(process.env.port, async () => {
    try{
        await connection;
        console.log(`Server is running at port ${process.env.port}`);
    } catch(err){
        console.log(err);
    }
});