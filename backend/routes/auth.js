const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require("express-validator");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECERT = "token";

//Route 1: Create a user using: POST "/auth/createuser"
router.post("/createuser", [
    body('username', 'Name should have min 3 chars').isLength({ min: 3 }),
    body('email', 'Enter a valid email id').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 8 }),
], async (req, res) => {

    let success = false; //for checking errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({ success, error: errors.array() });
    //Check whether the user with the email exists already
    try {
        let email = await User.findOne({ email: req.body.email });
        let username = await User.findOne({ username: req.body.username })
        if (email) {
            return res.status(400).json({success, error: 'Email id already exists'});
        }
        else if(username){
            return res.status(400).json({success, error: 'Username already exists'})
        }
        //Secure the password
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        //Add the user to database
        let user = await User.create({
            name: req.body.name,
            username:req.body.username,
            email: req.body.email,
            password: secPass,
        });
        //Create auth token using jsonwebtoken
        const data = {
            user:{
                id: user.id,
            }
        };
        const authToken = jwt.sign(data,JWT_SECERT);
        success = true;
        res.json({success,authToken});

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

//Route 2: Authenticate a user using: POST "/auth/login"
router.post("/login",[
    body('username','Enter a valid username').exists(),
    body('password','Password cannot be blank').exists(),
],async(req,res)=>{
    let success =false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {username, password} =  req.body;
    try {
        let user = await User.findOne({username});
        if(!user){
            return res.status(400).json({error:"Wrong Login Credentials"});
        }
        const passComp = await bcrypt.compare(password,user.password);
        if(!passComp){
            success = false;
            return res.status(400).json({success,error:"Wrong Login Credentials"});
        }
        const data = {
            user:{
                id: user.id,
            }
        };
        const authToken = jwt.sign(data,JWT_SECERT);
        success = true;
        res.json({success,authToken});

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }

});

//Route 3: Get loggin user details: GET "/auth/getuser"
router.get("/getuser",fetchuser,async(req,res)=>{
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})


module.exports = router;