/**
 * yourhistory.js
 *
 * Shows the current user's lookup history
 *
 */

const express = require('express')
const historyRouter = express.Router()
const mysql = require('mysql2')

const db = require('../models/db')

historyRouter.get('/yourhistory', function(req, res) {

	db.getCurrentUser({
		token: req.sessionID
	},{
		success: function(userData) {
            db.getUserHistory({
            	user_id: userData[0].id
			},{
                success: function(results) {
                    // show history
                    res.render("yourhistory.pug", {history: results, title: "History | Calculance"})

                },
                failure: function(error) {
                    // failed, don't show any history
                    res.render("yourhistory.pug", {history: {}, title: "History | Calculance"})

                }
            })
		},
		failure: function() {
			// redirect to home
			res.redirect('/login')

		}
	})
})

module.exports = historyRouter