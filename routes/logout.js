/**
 * login.js
 *
 * Handles routing for the login page
 */

const express = require('express')
const logoutRouter = express.Router()

const db = require('../models/db')

// handle GET to login
logoutRouter.get('/logout', function(req, res) {

    db.logoutUser({
        token: req.sessionID
    }, {
        // success OR failure, go back to login screen
        success: function() {
            console.info("* logged user out")
            res.redirect('/login')
        },
        failure: function() {
            console.info("~ failed to logout user with session id "+req.sessionID+", sending back to login screen")
            res.redirect('/login')
        }
    })
})

module.exports = logoutRouter