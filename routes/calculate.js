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
    db.getCurrentUser({token: req.sessionID},{
    	success: function() {
            res.render("calculator.pug", {title: "Calculate | Calculance"})
		},
		failure: function() {
    		// back to login
			res.redirect('/login')
		}
	})
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

	db.getCurrentUser({
		token: req.sessionID
	}, {
		success: function(data) {
			if(!data[0].id) {
				throw "Missing 'id' in calc request!"
			}

			if(!req.body.resistanceValue) {
				throw "Missing resistance value in calc request!"
			}

			if(!req.body.toleranceValue) {
				throw "Missing tolerance value in calc request!"
			}

			if(!req.body.gb1) {
				throw "Missing global band 1 in calc request!"
			}

            if(!req.body.gb2) {
                throw "Missing global band 2 in calc request!"
            }

            if(!req.body.gb3) {
                throw "Missing global band 3 in calc request!"
            }

            if(!req.body.gb4) {
                throw "Missing global band 4 in calc request!"
            }

			// add this historical lookup entry
			db.addHistory({
				user_id: data[0].id,
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