const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const { ObjectId } = mongoose.Schema.Types;

const posts = {
    'description' : {
        type: String,
        required: true,
    },
    'photo': {
        type: String,
        required: true,
    },
    'likes':[{ type : ObjectId, ref: "Users"}],
    'comments': [
        {
            text: String,
            postedBy: { type : ObjectId, ref: "Users"}
        }
    ],
    'postedBy': {
        type: ObjectId,
        ref: "Users"
    }
}

let postSchema = new Schema(posts, { collection: "Posts", timestamps: true });

module.exports = postConnection = mongoose.model("Posts", postSchema);