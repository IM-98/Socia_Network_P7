const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {signUpErrors, signInErrors} = require("../utils/errors")

exports.register = async (req, res, next) => {
  const {pseudo, email, password} = req.body
  
  try {
    bcrypt.hash(req.body.password,10)
    .then( hash => {
      const user = new User({
        pseudo : req.body.pseudo,
        email : req.body.email,
        password : hash
      })
      user.save()
      .then(()=> {
      console.log(req.body)
      res.status(201).json({user: user._id})
      })
    })
  } catch (err) {
    const errors = signUpErrors(err)
    res.status(400).send({errors})
  
  }
}

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN, {expiresIn : "24h"})
}

// pas utilisé les memes erreurs que le tuto
exports.signIn = (req, res) => {
  User.findOne({ email: req.body.email })
  .then(user => {
      if(!user) {
          return res.status(401).json( {message: "Identifiants incorrects"} )
      } else {
          bcrypt.compare(req.body.password, user.password)
          .then((valid) => {
              if(!valid){
                return res.status(401).json({message: "Mot de passe incorrect"})
              } 
              else {
                const token = createToken(user._id)
                res.cookie("jwt", token, {httpOnly : true, expiresIn : "24h"})
                const userID = user._id.valueOf()
                res.status(200).send(userID)
                console.log(userID)
              };
          })
      }
  })
  .catch(error => res.status(500).json({error}));
}

exports.logout = (req, res) => {
    res.clearCookie("jwt", "", {maxAge : 1} )
    res.status(200).send("cookies effacé")
}
