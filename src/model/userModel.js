const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const { ObjectId } = mongoose.Schema.Types;

const users = {
    'name': {
        type: String,
        required: true,
    },
    'email': {
        type: String,
        required: true,
        unique: true,
    },
    'password': {
        type: String,
        required: true
    },
    'followers': [{
        type: ObjectId,
        ref: "Users"
    }],
    'following': [{
        type: ObjectId,
        ref: "Users"
    }]
}

let userSchema = new Schema(users, { collection: "Users", timestamps: true });

module.exports = userConnection = mongoose.model("Users", userSchema);