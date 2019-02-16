//checks for dev environment
var isDev = process.env.NODE_ENV === "development";
if (isDev) {
    require('dotenv').config();
}

//dependencies
var express = require('express');
var path = require('path');
var db = require(path.join(__dirname + "/models"));
var jwt = require('express-jwt');

//server setup
var app = express();
var PORT = process.env.PORT || 3001;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//on production serve the client/build folder to user
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//routes
app.use("/api/user", require('./routes/api'));

//sets up jwt middleware to be used exclusively on this route. optionally, we may pass an array of routes to use middleware on, or not specify a route and it will be used on ALL following routes.
app.use("/api/validateuser", jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));

//route for just validating a user. if an invalid token is passed, this route should never be reached.
app.get("/api/validateuser", function (req, res) {
    res.json({
        message: "You should only see this if you are logged in successfully!"
    });
});

//sync db and start server
db.sequelize.sync({ force: isDev }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on port: " + "http://localhost:" + PORT)
    });
});