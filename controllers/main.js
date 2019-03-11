const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/passportConfig');

// GET /jobs - sends a form to post a job to the database /job
router.get('/', function(req, res) {
  console.log('USER00000000000', req.user)

  db.job.findAll( {
    where: {userId: req.user.id}
  }).then(function(jobs) {
  res.render('main', {jobs});
  });
});
// POST /jobs - posts a job to the dbase
router.post('/', function (req, res) {
  db.job.create( {
    jobTitle: req.body.jobTitle,
    company: req.body.company,
    location: req.body.company,
    url: req.body.url,
    postingDate: req.body.postingDate,
    state: req.body.state,
    userId: req.user.id
  }).then(function(job) {
    res.redirect('/main');
  });
});

// PUT /main/job - update a description
router.put('/:id', function(req, res) {
  db.job.update( {
    jobDescription: req.body.notes,
    userId: req.user.id
  }, {where: {id: req.body.jobId}
  }).then(function(jobDescription, created) {
    res.redirect('/main');
  });
});
// DELETE /main/jobs - a job from dbase 
router.delete('/:id', function(req, res) {
  console.log("))))))))))))))))))):id", req.params.id)
  db.job.destroy({
    where: {id: parseInt(req.params.id)}
  }).then(function(job) {
    res.redirect('/main');
  });
});

// GET /jobs/:id - one job
router.get('/:id', function(req, res) {
  db.job.findOne({
    where: {id: parseInt(req.params.id)}
  }).then(function(job) {
    res.redirect('/main', {job});
  });
});
module.exports = router;
