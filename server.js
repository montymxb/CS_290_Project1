// Requires the 'express' dependency downloaded by npm in 'npm install'
const express = require('express')

// Requires 'body-parser' dependency, this will be used to parse the data for a login request
const bodyParser = require("body-parser");

// Requires the 'path' dependency, which is built in by default (although we still need to require it)
const path = require('path')

// instantiate an 'app' from express()
const app = express()

// setup an arbitrary port to serve from. By convention port 80 is HTTP, and 443 is HTTPS.
// You usually don't see this, but entering http://localhost and http://localhost:80 are synonymous.
// Using port 5000 is arbitrary, any unused port will do, and you can change it to something else to see that it does this.
// You will have to restart the server for any changes to take effect however.
const port = 5000


// configure express to use body-parser as the middleware (decoder) for handling POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Shows serving a static file for a response to http://localhost:5000/
app.get('/', (request, response) => {
   // respond with the index.html page to start with...
   console.log("index served...");
   response.sendFile(path.join(__dirname + '/public/html/index.html'));
})

// Shows serving a 'login' page (also a static file) when the user visits
// http://localhost:5000/login
app.get('/login', (request, response) => {
	console.log("login page served...");
	response.sendFile(path.join(__dirname + '/public/html/login.html'));
});

// handles a POST request to login, just forwards to 'authenticated'
app.post('/login', (request, response) => {
	console.log("user "+request.body.username + " logging in...");
	response.redirect('/authenticated?username=' + request.body.username);
});

// Shows serving an 'authenticated' page when the user visits
// http://localhost:5000/authenticated
// Responds with the given string below being used as html.
// The \ characters allow the string to span that following line break, allowing it to be visually broken up
app.get('/authenticated', (request, response) => {
	console.log("processing authenticated request...");
	let html = "";
	if(!request.query.username) {
		console.log("NOT authenticated...");
		// not authenticated
		html = "<!DOCTYPE html>\
		<html>\
		<head>\
			<meta charset='utf-8'>\
			<title>Not Authenticated!</title>\
			<meta http-equiv='refresh' content='3;url=login'>\
		</head>\
		<body>\
			<h1>You are not authenticated!</h1>\
			<p>You will be redirected to the login page in 3 seconds</p>\
		</body>\
		</html>";

	} else {
		console.log("authenticated...");
		// authenticated!
		html = "<!DOCTYPE html>\
		<html>\
		<head>\
			<meta charset='utf-8'>\
			<title>Authenticated</title>\
		</head>\
		<body>\
			<h1>Welcome " + request.query.username + "!</h1>\
			<form action='logout' method='GET'><input type='submit' value='Logout!'></form>\
		</body>\
		</html>";
	}

	// write out the response with one html or the other
	response.send(html);
});

// Redirects to the login page
app.get('/logout', (request, response) => {
	console.log("logging out...");
	response.redirect('/login');
});

// This tells the server to listen for the aforementioned requests on
// the port we listed above. If it succeeds we should get the 'Server is listening...' message.
// On failure (such as when the port is already in use) we should be an error message
app.listen(port, (err) => {
  if (err) {
    return console.log('An error has occurred setting up the server. ', err)
  }
  console.log(`Server is listening on port ${port}`)
})
