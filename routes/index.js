var express = require('express');
var router = express.Router();
/////////////////////////////////////////////////token user + chiffrage mdp/////////////////////////////////////////
let uid2 = require("uid2");
let bcrypt = require("bcrypt");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let userModel = require('../models/users');
let trashModel = require('../models/trash')

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
    userin = await userModel.findOne({email : req.body.email,})
    if(bcrypt.compareSync(req.body.password, userin.password)) {
      result=true
      token = userin.token
    } else {
      error.push('veuillez verifier vos identifiants')
      console.log("error connex", error)
    }
  }
  res.json({userin, result, error})
})
//////////////////////////////////////////////////////////////////////add trash/////////////////////////////////////////////
router.post('/addtrash', async function (req,res,next) {
  let addtrash = new trashModel ({
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    color: req.body.color,
  })
  console.log("reqcolor", req.body.color)
  console.log('reqbody//', req.body)
  let newtrash = await addtrash.save()
  res.json({newtrash})
})
////////////////////////////////////////////////////////////////////call trash//////////////////////////////////////////////
router.get('/calltrash', async function (req, res, next) {
  let recuptrash = await trashModel.find()
  console.log('okd', recuptrash)
  res.json({recuptrash})
})

module.exports = router;
