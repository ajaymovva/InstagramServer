const express = require('express');
const routing = express.Router();
const service = require('../services/postServices');
const reqLogin = require('../services/requireLogin');

routing.get('/posts',reqLogin, (req, res, next) => {
    service.getPosts().then(posts => {
        return res.status(200).json({ success : posts });
    })
    .catch(error => {
        next(error);
    });
});

routing.post('/createpost', reqLogin, (req, res, next) => {
    const { description, photo } = req.body;
    if(!description){
        return res.status(200).json({error : "please add all fields"});
    }
    req.user.password = undefined;
    const reqObj = {
        description,
        photo,
        postedBy: req.user
    };
    service.addPost(reqObj)
        .then(response => {
            return res.status(200).json({ success : response });
        })
        .catch(error => {
            next(error);
        });
});

routing.get('/myPosts',reqLogin, (req, res, next) => {
    service.getPostsUser(req.user).then(posts => {
        return res.status(200).json({ success : posts });
    })
    .catch(error => {
        next(error);
    });
});

routing.get('/myFollowingPosts', reqLogin, (req, res, next) => {
    service.getFollowingPosts(req.user).then(posts => {
        return res.status(200).json({ success: posts });
    })
    .catch(error => {
        next(error);
    });
});

routing.post('/like', (reqLogin), (req, res, next) => {
    service.addLike(req).then(response => {
        return res.status(200).json({ success:response});
    })
    .catch(error => {
        next(error);
    });
});

routing.post('/unlike', (reqLogin), (req, res, next) => {
    service.removeLike(req).then(response => {
        return res.status(200).json({ success:response});
    })
    .catch(error => {
        next(error);
    });
});

routing.post('/comment', (reqLogin), (req, res, next) => {
    const reqObj = {
        text: req.body.text,
        postedBy: req.user._id,
    }
    service.addComment(reqObj, req.body.postId).then(response => {
        return res.status(200).json({ success:response});
    })
    .catch(error => {
        next(error);
    });
});

routing.post('/deletePost', (reqLogin), (req, res, next) => {
    const reqObj = {
        postId: req.body.postId,
        userId: req.user._id,
    };
    service.deletePost(reqObj).then(response => {
        return res.status(200).json({success: response});
    })
    .catch(error => {
        next(error);
    });
});

module.exports = routing;