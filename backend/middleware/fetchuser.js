const jwt = require('jsonwebtoken');

const JWT_SECERT = "token";

const fetchuser = (req, res, next) => {
    //Get the user from jwt token and add id to req body
    const token = req.header('authToken');
    if(!token){
        res.status(401).send({error:"Authentication failed"})
    }
    try {
        const data = jwt.verify(token,JWT_SECERT);
        req.user = data.user;
        next();
    } catch (error) {
      res.status(401).send({error:"Autentication failed"})  
    }
}

module.exports = fetchuser;