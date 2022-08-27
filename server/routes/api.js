const express = require('express') 
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user')

const jwt = require('jsonwebtoken')

const db = "mongodb+srv://itsumarashraf:umar777@cluster0.dfndnol.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(db, err =>{
    if(err){
        console.log('err')
    }else{
        console.log('Connected to MongoDb')
    }
    
})

//middleware for verifying jwt token
function verifyToken(req, res, next){
    if(!req.headers.authorization){ //if token not present
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1] //get token
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'umarashraf') //verify token 
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    console.log(payload)
    next()

}
//middleware ends

router.get('/', (req,res) =>{
    res.send('from api route')
});

router.post('/register', verifyToken, (req,res)=>{
    let userData = req.body
    let user = new User(userData)
   
    User.findOne({email:user.email}, (err, ifExists)=>{
        if(ifExists){
            res.status(403).send("This email is already registered")
        }
        if(err){
            console.log('something went wrong ', err)
        }
    })
    console.log('emited even after stopped')
    user.save((error, registeredUser) =>{
        if(error){
            console.log('error in saving ' ,error)
        }else{
            //generate jwt
            let payload ={subject: registeredUser._id}
            let token = jwt.sign(payload, 'umarashraf') //sign jwt with payload and secretkey
            res.status(200).send({token})
        }
    });

})

router.post('/login', (req,res) =>{
    let userData = req.body;
    User.findOne({email: userData.email}, (err, user)=>{
        if(err){
            console.log(err)
        }else{
            if(user && user.password==userData.password){
                let payload = {subject: user._id}
                let token = jwt.sign(payload, 'umarashraf')
                res.status(200).send({token})
            }else{
                
                res.status(401).send('invalid email or password')
            }
        }
    })
});

router.get('/todos', verifyToken, (req,res) =>{
    let todos =[
        {
            "_id":"1",
            "task":"Meeting at 2pm",
            "detail":"Discussion about the latest project of customer"
        },
        {
            "_id":"2",
            "task":"Deadline for 23",
            "detail":"Deliver current project on 23sep"
        },
        {
            "_id":"3",
            "task":"Get Grocies",
            "detail":"Bread, perfume, soap, milk"
        },
        {
            "_id":"4",
            "task":"Gym",
            "detail":"Gym at 4pm"
        },
        {
            "_id":"5",
            "task":"Call at 10pm",
            "detail":"Discussion about the current project"
        }
    ]
    res.json(todos)
});


module.exports = router