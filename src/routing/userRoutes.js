const express = require('express');
const requireLogin = require('../services/requireLogin');
const routing = express.Router();
var mongoose = require('mongoose');
const service = require('../services/userServices');

routing.get('/:userId', requireLogin ,(req, res, next) => {
    service.getUserDetails(req.params.userId).then(userDetails => {
        return res.status(200).json({ success: userDetails });
    })
    .catch(error => {
        next(error);
    });
});

routing.post('/follow', requireLogin, (req, res, next) => {
    var followId = mongoose.mongo.ObjectId(req.body.followId);
    const reqObj = { followId , userId: req.user._id };
    service.followUser(reqObj).then(response => {
        return res.status(200).json({ success: response });
    })
    .catch(error => {
        next(error);
    });
});

routing.post('/unfollow', requireLogin, (req, res, next) => {
    var followId = mongoose.mongo.ObjectId(req.body.followId);
    const reqObj = { followId, userId: req.user._id };
    service.unFollowUser(reqObj).then(response => {
        return res.status(200).json({ success: response });
    })
    .catch(error => {
        next(error);
    });
});

module.exports = routing;