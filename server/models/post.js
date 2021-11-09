const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
    {
        postBody: {
            type: String,
            required: 'Please enter something in the post body!',
            minlength: 1,
            maxlength: 300,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        comments: [
            {
                commentBody: {
                    type: String,
                    minlength: 1,
                    maxlength: 300,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                    get: (timestamp) => dateFormat(timestamp),
                },
                username: {
                    type: String,
                    required: true
                }
            }
        ]
    }
);

const Post = model('Post', postSchema);

module.exports = Post;