const postCollection = require('../model/postModel');

const model = {};
// posot

model.getPosts = async () => {
    try {
        const posts = await postCollection.find()
            .populate("postedBy", "_id name")
            .populate("comments.postedBy", "_id name");
        return posts;
    } catch (err) {
        let error = new Error('Error while fetching posts');
        error.status = 400;
        throw error;
    }
}

model.addPost = async (reqObj) => {
    try {
        const newPost = await postCollection.create(reqObj);
        return newPost;
    } catch (err) {
        let error = new Error('Error while post creation');
        error.status = 400;
        throw error;
    }
}

model.getPostsUser = async (reqObj) => {
    try {
        const myPost = await postCollection.find({ postedBy: reqObj._id })
            .populate("postedBy", "_id name")
            .populate("comments.postedBy", "_id name");
        return myPost;
    } catch (err) {
        let error = new Error('Error while fetching posts');
        error.status = 400;
        throw error;
    }
}

model.getFollowingPosts = async (reqObj) => {
    try{
        const myPosts = await postCollection.find({ postedBy: { $in: reqObj.following }})
            .populate("postedBy", "_id name")
            .populate("comments.postedBy", "_id name");
        return myPosts;
    }
    catch(err){
        let error = new Error('Error while fetching my following posts');
        error.status = 400;
        throw error;
    }
};

model.addLike = async (reqObj) => {
    try {
        const response = await postCollection.findByIdAndUpdate(
            reqObj.body.postId,
            { $push: { "likes": reqObj.user.id } },
            { new: true }
        )
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name");
        return response;
    } catch (err) {
        let error = new Error('Error while adding Like');
        error.status = 400;
        throw error;
    }  
}

model.removeLike = async (reqObj) => {
    try {
        const response = await postCollection.findByIdAndUpdate(
            reqObj.body.postId,
            { $pull: { "likes": reqObj.user.id } },
            { new: true }
        )
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name");
        return response;
    } catch (err) {
        let error = new Error('Error while removing Like');
        error.status = 400;
        throw error;
    }
}

model.addComment = async (reqObj, id) => {
    try {
        const response = await postCollection.findByIdAndUpdate(
            id,
            { $push: { "comments": reqObj } },
            { new: true }
        )
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name");
        return response;
    } catch (err) {
        let error = new Error('Error while adding comment');
        error.status = 400;
        throw error;
    }   
}

model.deletePost = async (reqObj) => {
    try {
        const post = await postCollection.findById({ _id: reqObj.postId });
        if (post && post.postedBy.toString() === reqObj.userId.toString()) {
            return post.remove().then(result => {
                return post;
            })
                .catch(err => {
                    let error = new Error('Error while deleting post');
                    error.status = 400;
                    throw error;
                });
        }
    } catch (err_1) {
        let error_1 = new Error('No post exists');
        error_1.status = 400;
        throw error_1;
    }   
};

module.exports = model;