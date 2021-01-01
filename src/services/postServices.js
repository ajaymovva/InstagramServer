const model = require('../dbLayer/postDbLayer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = require('../utils/keys');

const service = {};


service.addPost = async (reqObj) => {
    const response = await model.addPost(reqObj);
    return response;
};

service.getPosts = async () => {
    const response = await model.getPosts();
    return response;
};

service.getPostsUser = async (reqObj) => {
    const response = await model.getPostsUser(reqObj);
    return response;
};

service.getFollowingPosts = async (reqObj) => {
    const response = await model.getFollowingPosts(reqObj);
    return response;
};

service.addLike = async (reqObj) => {
    const response = await model.addLike(reqObj);
    return response;
};

service.removeLike = async (reqObj) => {
    const response = await model.removeLike(reqObj);
    return response;
};

service.addComment = async (reqObj, id) => {
    const response = await model.addComment(reqObj, id);
    return response;
};

service.deletePost = async (reqObj) => {
    try {
        const response = await model.deletePost(reqObj);
        return response;
    } catch (err) {
        console.log(err, "error");
    }
};
module.exports = service;