require('dotenv').config()
require("./database/database").connect()
const express = require('express')
const bcrypt  = require('bcryptjs')
const jwt =  require("jsonwebtoken")
const cookieParser = require('cookie-parser')


const app = express()
app.use(express.json())
app.use(cookieParser())


app.get('/',(req,res)=>{
    res.send("<h1>server is working</h1>")
})

app.post("/reqister", async(req,res)=>{
    try {
        //get all data from body
        const {firstname,lastname,email,password}= req.body
        //all the data should exits
        if (!(firstname && lastname && email && password)){
            res.status(400).send("all fields are compulsory");
        }
        //check if user already exits
        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(401).send("user is already exits in database")
        }
        //encrypt the password
        const myEncPassword = await bcrypt.hash(password,10)
        //save the user in DB
        const user = User.create({
            firstname,
            lastname,
            email,
            password: myEncPassword
        })
        //generate a token for user and send it 
        const token  = jwt.sign(
            {if:user._id,email},
            'shhhh',
            {
                expiresIn: "2h"
            }
        );
        user.token = token
        user.password = undefined


            res.status(201).json(user)
            

    } catch (error) {
        console.log(error);
    }
})

app.post('/login',async(req,res)=>{
    try {
        //get all data  form frontend
    const {email,password} = req.body
    //validation
    if(!(email&& password)){
        res.status(400).send("incomplete email and password")
    }
    //find user in db
    const user = await User.findOne({email})
    //if user not there in database then
 //   if(!(user)){
   //     res.send(401).send("user not found")
    //}
    //match in password from  
   if(user && ( await bcrypt.compare(password, user.password))){
    const token  = jwt.sign(
        {id:user._id},
        'shhhh',
        {
            expiresIn: "2h"
        }
    );

    user.token = token
    user.password = undefined

    //send token in user cookie
    const option = {
        expires: new Date(Date.now()+3*24*60*60*1000),
        httpOnly:true
    };

    res.status(200).cookie("token",token,this.options).json({
        success: true,
        token, 
        user
    })
   }

    } catch (error) {
        console.log(error);
    }

})

module.exports =app