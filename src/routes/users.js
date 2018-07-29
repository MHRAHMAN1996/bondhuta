const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');


router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

router.post('/register', function(req, res, next) {
  const user = new User({
    email: req.body.email,
    password: User.hashPassword(req.body.password),
    username: req.body.username,
    gender: req.body.gender,
    creation_date: Date.now()
  })

  let promise = user.save();

  promise.then(function(doc) {
    return res.status(201).json(doc);
  })

  promise.catch(function(err) {
    return res.status(501).json({message: 'Registration failed'})
  })
  
});

router.post('/login', function(req, res, next){
    let promise = User.findOne({email:req.body.email}).exec();
 
    promise.then(function(doc){
     if(doc) {
       if(doc.isValid(req.body.password)){
           // generate token
           let token = jwt.sign({doc},'secret', {expiresIn : '3h'});
 
           return res.status(200).json(token);
 
       } else {
         return res.status(501).json({message:' Invalid Credentials'});
       }
     }
     else {
       return res.status(501).json({message:'User email is not registered.'})
     }
    });
 
  promise.catch(function(err){
    return res.status(501).json({message:'Some internal error'});
  })
});

router.get('/username', verifyToken, function(req, res, next){
  return res.status(200).json(decodedToken.username);
});

router.get('/profile', verifyToken, function(req, res, next){
  return res.status(200).json(decodedToken.doc);
});

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, {new:true}, function (err, user) {
    if (err)
      res.status(500).send(err);
    else
      res.json({ message: 'User updated!' });
  });
});

router.patch('/:id', function(req, res) {
  if(req.body.id) {
    delete req.body.id;
  }
  for(var i in req.body) {
    req.user[i] = req.body[i];
  }
  req.user.save(function(err) {
    if(err) {
      res.status(500).send(err);
    }
    else {
      req.json(req.user);
    }
  })
})

router.delete('/:id', function(req, res, next) {
  User.remove({_id: req.params.id}, function(err, result) {
    if(err) {
      res.json(err);
    } else {
      res.json(result)
    }
  })
})

var decodedToken='';
function verifyToken(req, res, next){
  let token = req.query.token;

  jwt.verify(token,'secret', function(err, tokendata){
    if(err){
      return res.status(400).json({message:' Unauthorized request'});
    }
    if(tokendata){
      decodedToken = tokendata;
      console.log(decodedToken);
      next();
    }
  })
}

module.exports = router;

