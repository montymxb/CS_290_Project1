// Requires the 'express' dependency downloaded by npm in 'npm install'
const express = require('express')

// Requires 'body-parser' dependency, this will be used to parse the data for a login request
const bodyParser = require("body-parser");

// Requires 'express-session', a dependency for using sessions with express
// Sessions are tracked states of a server interacting with an individual user over time.
// Each session is for each user, uniquely, and cookies are used to allow the user to identify their 'session key'
// that uniquely identifies their own session. It's like your OSU ID# uniquely identifying you.
const express_session = require('express-session');

// Requires the 'path' dependency, which is built in by default (although we still need to require it)
const path = require('path')

// instantiate an 'app' from express()
const app = express()

const loginRouter = require("./routes/login")
const homeRouter = require("./routes/home")
const calculateRouter = require("./routes/calculate")
const yourHistoryRouter = require("./routes/yourhistory")
const lookup = require("./routes/lookup")
const logoutRouter = require('./routes/logout')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// setup an arbitrary port to serve from. By convention port 80 is HTTP, and 443 is HTTPS.
// You usually don't see this, but entering http://localhost and http://localhost:80 are synonymous.
// Using port 5000 is arbitrary, any unused port will do, and you can change it to something else to see that it does this.
// You will have to restart the server for any changes to take effect however.
const port = 5058


// configure express to use body-parser as the middleware (decoder) for handling POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure our session secret
app.use(express_session({
	secret: 'secret_session_key'
}));

// Used to make all files from directories in 'public' available upon request
app.use(express.static('public'));


// Routers
app.use('/', homeRouter)
app.use('/', yourHistoryRouter)
app.use('/', loginRouter)
app.use('/', calculateRouter)
app.use('/', logoutRouter)
app.use('/lookup', lookup)

// This tells the server to listen for the aforementioned requests on
// the port we listed above. If it succeeds we should get the 'Server is listening...' message.
// On failure (such as when the port is already in use) we should be an error message
app.listen(port, (err) => {
  if (err) {
    return console.log('An error has occurred setting up the server. ', err)
  }
  console.log(`Server is listening on port ${port}`)
})
