const userModel = require('../dbLayer/userDbLayer');
const postModel = require('../dbLayer/postDbLayer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = require('../utils/keys');

const service = {};

service.createUser = async (user) => {
    const hashPassword = await bcrypt.hash(user.password, 12);
    user.password = hashPassword;
    const response = await userModel.createUser(user);
    return response;
};

service.findUser = async (user) => {
    const savedUser = await userModel.findUser(user);
    if (!savedUser) {
        let error = new Error('Invalid Email or  password');
        error.status = 400;
        throw error;
    }
    try {
        const matched = await bcrypt.compare(user.password, savedUser.password);
        if (matched) {
            const token = jwt.sign({ _id: savedUser._id }, JWT_TOKEN);
            return { token, user: savedUser };
        }
        else {
            let error_1 = new Error('Invalid Email or  password');
            error_1.status = 400;
            throw error_1;
        }
    } catch (err) {
        let error_2 = new Error('Wrong credentials');
        error_2.status = 400;
        throw error_2;
    }
};

service.getUserDetails = async (userId) => {
    const user = await userModel.findById(userId);
    const posts = await postModel.getPostsUser({ _id: userId });
    return { user, posts };
};

service.followUser = async (reqObj) => {
    const response = await userModel.addToFollowers(reqObj);
    try {
        const responseUpdated = await userModel.addToFollowing(reqObj);
        return { followedUser: response, followingUser: responseUpdated };
    } catch (err) {
        const response_1 = await userModel.removeFromFollowers(reqObj);
        return response_1;
    }
};

service.unFollowUser = async (reqObj) => {
    const response = await userModel.removeFromFollowers(reqObj);
    try {
        const responseUpdated = await userModel.removeFromFollowing(reqObj);
        return { followedUser: response, followingUser: responseUpdated };
    } catch (err) {
        const response_1 = await userModel.addToFollowers(reqObj);
        return response_1;
    }
};

module.exports = service;