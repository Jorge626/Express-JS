/*
    Express is a "server-side" or "back-end" framework. It is not comparable to
    client-side frameworks like React, Angular, & Vue. It can be used in combination
    with those frameworks to build full stack applications. 

    You will typically build out an API with Express so that it can take requests from 
    the front-end and then serves back data (typically in JSON fromat). 

    Why use Express?
    - Makes building web-applications with Node.js MUCH easier.
    - Used for both server rendered apps as well as API/Microservices
    - Exremeley light, fast, and free
    - Full control of requests and responses
    - Most popular Node framework
    - Great to use with client side frameworks as it's all JavaScript

    Helps to learn these:
    - HTTP Status Codes
    - JSON
    - High Order Array Methods - forEach, map, filter
    - Arrow Functions

    Basic Route Handling
    - app.get(), app.post(), app.put(), app.delete(), etc.
    - Access to params, query strings, url parts, etc
    - Express has a router so we can store routes in separate files and export
    - We can parse incoming data with the Body Parser

    Middleware functions are functions that have access to the requests and response
    object. Express has built in middleware but middleware also comes from 3rd 
    party packages as well as custom middleware
    - Execute any code
    - Make changes to the request/response objects
    - End response cycle
    - Call next middleware in the stack

    Use express-handlebars for a template engine:
    To install: npm install express-handlebars

    Usually, you will either be building an API so you can have React or Vue on the 
    front-end and you're just serving JSON or you're gonna have a complete server side
    app where you use templates.

    If you are using a template engine, you can use passportjs
    Use passport-jwt to work with HSON Web tokens when using React Vue etc.
    Use passport-local if using just Express (server side app)

    Basic Server Syntax
    ~~~~~~~~~~~~~~~~~~~
    const express = require('express');

    // Init express
    const app = express();

    // Create your endpoints/route handlers
    app.get('/', function(req, res) {
    // Fetch from database, load pages, return JSON, Full access to request/response
    res.send('Hello World!');
    });

    // Listen on a port
    app.listen(5000)
*/

const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members')

const app = express();

// Init middleware
// app.use(logger);

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Handlebards Middleware
app.engine('handlebars', exphbs.engine({defaultLayout: "main"}));
app.set('view engine', 'handlebars');


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));