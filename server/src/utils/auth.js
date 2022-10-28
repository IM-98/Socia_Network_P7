const jwt = require('jsonwebtoken');
const User = require("../models/user");

exports.checkUser = (req,res,next) => {
  const token = req.cookies.jwt 
  if(token){
    jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => {
      if(err){
        res.locals.user = null 
        res.clearCookie("jwt")
        next()
      }
      else{
        let user = await User.findById(decodedToken.id)
        res.locals.user = user 
        next()
      }
    })
  }
  else{
    res.locals.user = null 
    next()
  }
}

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt 
  if(token){
    jwt.verify(token, process.env.TOKEN, (err, decodedToken)=> {
      if (err){
        console.log(err)
      }
      else{
        console.log(decodedToken.id)
        next()
      }
    })
  }
  else{
    res.send("")
    console.log("no token")
  }
}