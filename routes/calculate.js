/**
 * calculate.js
 *
 * Router for handling the calculation of resistance values
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
			res.render("yourhistory.pug", {history: results})

		},
		failure: function(error) {
			// failed, don't show any history
			res.render("yourhistory.pug", {history: {}})

		}
	})
})

module.exports = historyRouter