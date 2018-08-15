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

historyRouter.get('/calculate', function(req, res) {
	res.render("calculator.pug", {title: "Calculate | Calculance"})
})


// convert a given color to hex
function convertToHex(color) {
	switch(color) {
		case "black":
			return "#000"
		case "brown":
			return "#7a5230"
		case "red":
			return "#f00"
		case "orange":
			return "#ffa500"
		case "yellow":
			return "#ffff4d"
		case "green":
			return "#0f0"
		case "blue":
			return "#00f"
		case "violet":
			return "#885ead"
		case "grey":
			return "#ccc"
		case "white":
			return "#eee"
		default:
			return "#fff"
	}
}

historyRouter.post('/calculate', function(req, res) {
	//resistanceValue
	//toleranceValue
	// get the current user
	getCurrentUser({
		token: req.sessionID
	}, {
		success: function(data) {
			// add this historical lookup entry
			addHistory({
				user_id: data.user_id,
				resistance: req.body.resistanceValue,
				tolerance: req.body.toleranceValue,
				colors: convertToHex(req.body.globalBand1) + "," + convertToHex(req.body.globalBand2) + "," + convertToHex(req.body.globalBand3) + "," + convertToHex(req.body.globalBand4)
			})
			
		},
		failure: function(err) {
			// failure
			console.error("Calculate ran into an error: "+err);

		}
	})
})

module.exports = historyRouter