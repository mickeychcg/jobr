const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/passportConfig');
const request = require('request');

// GET /search - renders job search page
router.get('/', function(req, res) {
    res.render('search');
});
// GET /results - renders results of job search
router.get('/show', function(req,res) {
  let apiUrl = `https://api.careeronestop.org/v1/jobsearch/${process.env.userid}/${encodeURI(req.query.keyword)}/${encodeURI(req.query.location)}/25/0/0/0/10/30?source=NLx&showFilters=false`
  request({
    url: apiUrl,
    headers: {
      'Authorization': 'Bearer ' + process.env.APIToken,
    }
  }, function(error, response, body) {
    console.log("Error", error);
    let jobs = JSON.parse(body)["Jobs"];
    let location = JSON.parse(body)["JobsKeywordLocations"].Location;
    let keyword = JSON.parse(body)["JobsKeywordLocations"].Keyword;

    res.render('search/show', {jobs,location,keyword});
    });
  }); 

  module.exports = router;
