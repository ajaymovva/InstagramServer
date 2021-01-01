const express = require('express');
const routing = express.Router();
const service = require('../services/userServices');
const reqLogin = require('../services/requireLogin');

routing.post('/signup', (req, res, next) => {
    const reqObj = req.body;
    if ( !reqObj.name || !reqObj.email || !reqObj.password) {
        return res.status(200).json({ error: "please add all the fields " });
    }
    service.createUser(reqObj)
        .then(response => {
            return res.status(200).json({ success: response });
        })
        .catch(error => {
            return res.status(200).json({ 'error': error.message });
        });
});

routing.post('/signin', (req, res,next) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(200).json({error : "please add all fields"});
    }
    service.findUser(req.body)
        .then(response => {
            delete response.user.password;
            return res.status(200).json({ success : response });
        })
        .catch(error => {
            next(error);
        });
});

module.exports = routing;