const express = require("express");
const {UserModel} = require('../model/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post('/register', (req, res) => {
    const {username, email, password} = req.body;
    try{
        bcrypt.hash(password, 8, async (err, hash) => {
            if(hash){
                const user = new UserModel({username, email, password: hash});
                await user.save();
                res.send({"msg": "new user has been registered"});
            } else{
                res.send({"error": err});
            }
        })
    } catch(err){
        res.send({"error": err});
    }
})

userRouter.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await UserModel.findOne({email});
        bcrypt.compare(password, user.password, async (err, result) => {
            if(result){
                const token = jwt.sign({userId:user._id, author:user.username}, "masai")
                res.send({"msg": "Login Successfull", "token": token});
            } else {
                res.send({"msg": err});
            }
        })

    } catch(err){
        res.send({"msg": err});
    }
})

module.exports = {
    userRouter
}
