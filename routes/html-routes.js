// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

const db = require("../models");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("index");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/signup", (req, res) => {
    // If the user doesn't hava an account send them to the signup page
    if (req.user) {
      res.redirect("/signup");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/dates-results", (req, res) => {
    db.Date.findAll({}).then(results => {
      console.log(results);
      const dates = JSON.parse(JSON.stringify(results));
      res.render("view", { dates: dates });
    });
  });
};
