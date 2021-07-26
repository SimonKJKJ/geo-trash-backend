var express = require('express');
var router = express.Router();
/////////////////////////////////////////////////token user + chiffrage mdp/////////////////////////////////////////
let uid2 = require("uid2");
let bcrypt = require("bcrypt");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let userModel = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
///////////////////////////////////////////////////////SIGNUP///////////////////////////////////////
router.post('/signup', async function (req,res,next) {
  let newUser= null;
  let result = false
  let error = []
  let hash = bcrypt.hashSync(req.body.password, 10);

  const userdata = await userModel.findOne({
    email: req.body.email,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
  })
  if (userdata != null){
    error.push('cet utilisateur est déja présent')
  }

  if( req.body.email == '' || req.body.firstname == '' || req.body.lastname == '' ) {
    error.push('veuillez verifier vos informations')
  }

  if (error.length == 0) {
    let userSignup = new userModel({
    email: req.body.email,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    password: hash,
    token: uid2(32)
    })
    newUser = await userSignup.save() 

    if(newUser) {
    result = true
    }
  }
  
  console.log("newUser///////",newUser)
  res.json({newUser, result, error})
});
/////////////////////////////////////////////////////////LOGIN///////////////////////////////////////
router.post ('/login', async function (req, res, next) {
  let result = false;
  let userin = null;
  error = [];

  if(req.body.email == ''|| req.body.password == '') {
    error.push('champs vides')
    console.log("error///", error)
  }
  if(error.length == 0) {
      userin = await userModel.findOne({
      email : req.body.email,
      password: req.body.password
    })
      console.log("reqbodymail///", req.body.email)
    if (userin) {
      result = true
    } else {
      error.push('veuillez verifier vos identifiants')
      console.log("error connex", error)
    }
  }


  res.json({userin, result, error})
})

module.exports = router;
