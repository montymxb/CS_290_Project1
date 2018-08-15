/**
 * login.js
 *
 * Handles routing for the login page
 */

const express = require('express')
const loginRouter = express.Router()

const db = require('../models/db')

// handle GET to login
loginRouter.get('/login', function(req, res) {

	console.info("\n\nCurrent SessionID: "+req.sessionID+"\n\n");

	db.getCurrentUser({
		token: req.sessionID
	}, {
		success: function(data) {
            // redirect to calculate
            res.redirect('/calculate')

		},
		failure: function(err) {
			console.info("FAILED ON LOGIN VISIT")
			console.dir(err)
			// login page per normal
            res.render('login.pug', {title: "Login | Calculance"})
		}
	})
})


// handle POST to login
loginRouter.post('/login', function(req, res) {
	// pull out the username in this request, otherwise redirect back to login
	if(!req.body.username) {
		res.render('login.pug', {title: "Login | Calculance"})
		return

	}

	// login this user
	db.loginUser({
		username: req.body.username,
		token: req.sessionID
	},{
		success: function(data) {
            // redirect to the 'calculate' page
            res.redirect('/calculate')

		},
		failure: function(err) {
			// failed, redirect back to login
			res.redirect('/login')

		}
	})
})

module.exports = loginRouter