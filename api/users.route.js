// users.route.js

const express = require('express');
const usersRoutes = express.Router();

// Require Users model in our routes module
let Users = require('./users.model');

// Defined store route
usersRoutes.route('/register').post(function (req, res) {
  Users.findOne({ username: req.body.username }, function (err, users) {
    if (users) {
      res.status(204).json({
        'users': 'username already exist'
      });
    } else {
      let users = new Users(req.body);
      users.save()
        .then(business => {
          res.status(200).json({ 'users': 'User has been registered' });
        })
        .catch(err => {
          res.status(204).send("Unable to save to database");
        });
    }
  });
});

usersRoutes.route('/login').post(function (req, res) {
  Users.findOne(req.body, function (err, users) {
    if (users) {
      res.status(200).json({
        'user': users._id,
        'isAuthenticated': true
      });
    } else {
      res.status(200).json({
        'user': false,
        'isAuthenticated': false
      });
    }
  });
});

// Defined edit route
usersRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Users.findById(id, function (err, users) {
    res.json(users);
  });
});

//  Defined update route
usersRoutes.route('/update/:id').post(function (req, res) {
  Users.findById(req.params.id, function (err, users) {
    if (!users)
      res.status(404).send("data is not found");
    else {
      users.save().then(users => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
usersRoutes.route('/delete/:id').get(function (req, res) {
  Users.findOneAndDelete({ _id: req.params.id }, function (err, users) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = usersRoutes;