
var express = require('express'),
	aboutRouter = express.Router({mergeParams: true}),
	fs = require('fs'),
	initContributorInfo = require('./contributorsInfo.js'),
    initContributors = require('./contributors.js'),
    contributorsInfo = new initContributorInfo.getContributorsInfoList(),
    contributors = new initContributors.getContributorsList();

aboutRouter.all('/', function(req, res) {
	 res.json(contributors);
});

aboutRouter.all('/Contributors', function(req, res) {
	 res.json(contributorsInfo);
});

module.exports = aboutRouter;