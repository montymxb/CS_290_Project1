# CS_290_Project1
Resistor Calculator Project

## Helpful links for working on this project
- [W3 Schools](https://www.w3schools.com)
    - W3 Schools are fairly helpful at covering HTML/CSS/JS (and more) in a broad sense
- [JS @ W3](https://www.w3schools.com/js/default.asp)
    - javascript tutorials (client side js)
    - [Also their AJAX tutorial](https://www.w3schools.com/js/js_ajax_intro.asp) is in javascript, and may be very helpful to understand how that works.
- [JQuery @ W3](https://www.w3schools.com/jquery/default.asp)
    - Should note that jQuery is itself _written in javascript_. Everything you can do in jQuery you can do in vanilla JS, but it helps abstract the complexity away so you don't need to build boilerplate code yourself. I should note that it's really helpful if you can understand how to do something in vanilla JS before you learn how to do it in jQuery.
- [CSS @ W3](https://www.w3schools.com/css/default.asp)
    - css tutorials
- [JSON @ W3](https://www.w3schools.com/js/js_json_intro.asp)
    - json tutorials
- [Node.js @ W3](https://www.w3schools.com/nodejs/default.asp)
    - node.js tutorials (server side js)
- [SQL @ W3](https://www.w3schools.com/sql/default.asp)
    - structured query language (SQL) tutorials (applies to making queries to a MySQL DB)

- Additionally a few other sites I've found that may be helpful
    - Javascript
        - [javascript.info](https://javascript.info/)
        - [Mozilla Developer Network (MDN), Javascript Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics)
    - HTML
        - [Tutorials Point, HTML](https://www.tutorialspoint.com/html/index.htm)
        - [Mozilla, HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML)
    

- For setting up the server in Node.js
    - [Node Package Manager (NPM)](https://www.npmjs.com/)
        - This will be used to help manage dependencies (like [express](https://www.npmjs.com/package/express) for the underlying server code) that we will need to setup a server in Node.js. Remember, node.js is not a server, it's just a different environment for interpreting and executing javascript than what you would have in your browser (also with some different rules in syntax). The concept of the server is just something that can be set up _in_ javascript.
            - [Wiki on what node.js is, and some history](https://en.wikipedia.org/wiki/Node.js)
            - [Stackoverflow post about what Node.JS is, in summary](https://stackoverflow.com/questions/1884724/what-is-node-js)
    - [Blog about setting up your first Node.js server](https://blog.risingstack.com/your-first-node-js-http-server/)
        - <strong>This shows you how to actually set up a server with express</strong>

## Instructions for setting this up
#### So everyone can have this running on their own machines as needed.

1. install dependencies via npm (from the terminal)
    - `$npm install` // will use package.json 'dependencies' to set this up
2. start the server (can use npm to manage this)
    - `$npm start`
3. server will start running and will indicate so on the command line
4. Visit http://localhost:5000 in your browser to see the resulting page
5. To stop the server hit Ctrl-C to stop the process, this will kill the server

## Explanation of the layout
In the project you'll see something like the following
- server.js
- public
    - css
        - style.css
    - html
        - index.html
    - js
        - client.js
- node_modules
    - lots of stuff in here, i'll explain shortly...
- .gitignore
- package.json
- README.md

The **server.js** file is the starting point of the server. Here an express application is setup to receive requests and 'serve' the appropriate content. You can see that for the '/' (or root) request it will serve the static **index.html** file. Note that html,css, and JS files are all within the **public** directory, as this content is meant to be accessible by anyone.

The **node_modules** folder is automatically generated & managed by npm. Here the dependencies for this project are stored, as stated in package.json. Note that it will generally contain a lot more than just what you are depending on directly, since other projects will also have dependencies, and their dependencies may have dependencies, and so on and so forth.

The **.gitignore** file is used to tell **git** what _not_ to track when version controlling this project. In particular it will exclude the folder node_modules & it's contents. This should be setup locally and not committed to the repository on github. Keeping these dependent projects out of version control directly decreases the size of this project when cloning, it also ensures that a user only needs to run **npm install** to get things setup every time.

The setup for serving index.html is fine for basic websites, but if we want to have a section that only logged in users can access we'll have to do a bit more. In that case we'll need to setup the server to verify that a user is logged in, and if they are forward them to a page that verifies that they are logged in. This is where server side scripting comes into play.

To demonstrate the concept of restricting a user you can checkout the 'login' and 'authenticated' endpoints that are listed. These can both be reached by hitting http://localhost:5000/login & http://localhost:5000/authenticated. Hitting authenticated when not already setup will show an error, and redirect you back to the login after 5 seconds. The login page just has a username field & a simple button to login as a demonstration. Upon logging in you will be taken to the the authenticated page, with a welcome message displaying your username and the option to logout.
