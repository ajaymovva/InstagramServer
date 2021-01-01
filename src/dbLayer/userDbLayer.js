const userCollection = require('../model/userModel');

const model = {};

model.createUser = async (user) => {
    try {
        const savedUser = await userCollection.findOne({ email: user.email });
        if (savedUser) {
            return 'user already exists';
        }
        try {
            const newUser = await userCollection.create(user);
            return 'user created successfully';
        } catch (err) {
            let error = new Error('Error while user creation');
            error.status = 400;
            throw error;
        }
    } catch (err_1) {
        let error_1 = new Error('Error while user creation');
        error_1.status = 400;
        throw error_1;
    }
}

model.findUser = async (user) => {
    try {
        const savedUser = await userCollection.findOne({ email: user.email });
        return savedUser;
    } catch (err) {
        let error = new Error('user not found');
        error.status = 400;
        throw error;
    }
}

model.findById = async (_id) => {
    try {
        const userData = await userCollection.findById(_id)
            .select('-password');
        return userData;
    } catch (err) {
        let error = new Error('user not found');
        error.status = 400;
        throw error;
    }
}

model.addToFollowers = async (reqObj) => {
    try {
        const response = await userCollection.findByIdAndUpdate(reqObj.followId, {
            $push: { "followers": reqObj.userId }
        }, { new: true })
            .select('-password');
        return response;
    } catch (err) {
        let error = new Error("Error while adding to followers");
        error.status = 400;
        throw error;
    }
}

model.addToFollowing = async (reqObj) => {
    try {
        const response = await userCollection.findByIdAndUpdate(reqObj.userId, {
            $push: { "following": reqObj.followId }
        }, { new: true })
            .select('-password');
        return response;
    } catch (err) {
        let error = new Error("Error while adding to following");
        error.status = 400;
        throw error;
    }
}

model.removeFromFollowers = async (reqObj) => {
    try {
        const response = await userCollection.findByIdAndUpdate(reqObj.followId,
            { $pull: { "followers": reqObj.userId } },
            { new: true })
            .select('-password');
        return response;
    } catch (err) {
        let error = new Error("Error while removing from followers");
        error.status = 400;
        throw error;
    }
}

model.removeFromFollowing = async (reqObj) => {
    try {
        const response = await userCollection.findByIdAndUpdate(reqObj.userId,
            { $pull: { "following": reqObj.followId } },
            { new: true })
            .select('-password');
        return response;
    } catch (err) {
        let error = new Error("Error while removing from following");
        error.status = 400;
        throw error;
    }
}

module.exports = model;