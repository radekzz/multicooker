// users.route.js

const express = require('express');
const usersRoutes = express.Router();

// Require Users model in our routes module
let Users = require('./users.model');

// Defined store route
usersRoutes.route('/register').post(function (req, res) {
  let users = new Users(req.body);
  users.save()
    .then(users => {
      res.status(200).json({ 'users': 'users in added successfully' });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
/*usersRoutes.route('/').get(function (req, res) {
  Users.find(function (err, userses) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(userses);
    }
  });
});*/

usersRoutes.route('/login').post(function (req, res) {
  Users.findOne(req.body, function (err, users) {
    console.log(req.body);
    const { password } = req.body;
    const { username } = req.body;
    console.log(username);
    if (users) {
      console.log(users);
      res.status(200).json({
        'users': 'user authenticated'
      });
    } else {
      console.log("Wrong username or password");
      res.status(400).json({
        'users': 'user sucks'
      });
    }
  });
  /*Users.findById(req.params.id, function (err, users) {
    console.log(req.body);
    const { body } = req;
    const { password } = body;
    let { username } = body;
    if (!username) {
      console.log("no username");
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    } else {
      res.status(200).json({ 'users': 'users in added successfully' });
    }
    if (!password) {
      console.log("no password");
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    } else {
      res.status(200).json({ 'users': 'users in added successfully' });
    }
  });*/
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