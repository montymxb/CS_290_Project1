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

	db.getUserHistory({
		success: function(results) {
			// show history
			console.dir(results);
			res.render("yourhistory.pug", {history: results, title: "History | Calculance"})

		},
		failure: function(error) {
			// failed, don't show any history
			res.render("yourhistory.pug", {history: {}, title: "History | Calculance"})

		}
	})
})

module.exports = historyRouter