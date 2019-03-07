const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/passportConfig');

// GET /jobs - all jobs
router.get('/jobs', function(req, res) {
  
});

// GET /jobs/:id - one job
router.get('/:id', function(req, res) {
  db.job.findOne(where: id: parseInt(req.params.id)
  ]).then(function(job) {
    res.render('jobs/show', {job});
  });
});

// GET /jobs - sends a form to post a job to the dbase /job

// POST /jobs - posts a job to the dbase
router.post('/', function (req, res) {
  db.job.create({
    jobTitle: req.body.jobTitle;
    company: req.body.company;
    location: req.body.company;
    url: req.body.url;
    postingDate: req.body.postingDate;
    state: req.body.state;
    userId: req.body.userId;
  }).then(function(job) {
    res.redirect('/jobs');
  });
});
// PUT /job/:id - update a description

// DELETE /jobs/:id - a job from dbase 

module.exports = router;
