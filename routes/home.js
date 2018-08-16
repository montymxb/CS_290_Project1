/**
 * home.js
 *
 * Handles routing for the home page
 */

const express = require('express')
const homeRouter = express.Router()

homeRouter.get('/', function(req, res) {
	res.render('home.pug', {title: "Home | Calculance"})
})

module.exports = homeRouter