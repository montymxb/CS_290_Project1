/**
 * yourhistory.js
 *
 * Shows the current user's lookup history
 *
 */

const express = require('express')
const historyRouter = express.Router()
const mysql = require('mysql2')

const credentials = require('./../config/credentials.json')

historyRouter.get('/yourhistory', function(req, res) {

	// query DB for last 100 entries this user created
	const connection = mysql.createConnection(credentials)

	connection.query("SELECT * FROM History ORDER BY createdAt ASC LIMIT 100", function(err, results, fields) {
		// add these entries to the PUG template
		res.render("history", {history: results})

	})
});

module.exports = historyRouter