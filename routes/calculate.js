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

		// both the same
		case "grey":
			return "#808080"
        case "gray":
            return "#808080"

		case "white":
			return "#eee"
		case "gold":
			return "#ffd700"
		case "silver":
			return "#c0c0c0"
		default:
			console.info("Unknown color '"+color+"', defaulting to #fff")
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

			let colors = convertToHex(req.body.gb1) + "," + convertToHex(req.body.gb2) + "," + convertToHex(req.body.gb3) + "," + convertToHex(req.body.gb4);

			let descrip = req.body.gb1+","+req.body.gb2+","+req.body.gb3+","+req.body.gb4

			// add this historical lookup entry
			db.addHistory({
				user_id: data[0].id,
				resistance: req.body.resistanceValue,
				tolerance: req.body.toleranceValue,
				colors: colors,
                descrip: descrip
			}, {
				success: function() {
					// note that history was added
					console.info("* lookup recorded");
					res.send("calculation recorded for "+colors);
				},
				failure: function() {
					console.error("Unable to record lookup!");
				}
			})

		},
		failure: function(err) {
			// failure
			console.error("Calculate ran into an error: "+err);

		}
	})
})

module.exports = historyRouter