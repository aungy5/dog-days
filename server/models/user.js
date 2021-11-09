const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt")

const Dog = require('./dog')
const Comment = require('./comment')
const Post = require('./post')

const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true,
            unique: true,
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String, 
            required: true,
            minLength: 7
        },
        savedDogs: [Dog.schema],
        // commentsMade: [Comment.schema],
        postsMade: [Post.schema],
        // commentsMade: [Post.comments.schema]
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// HASH USER PW
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
    next();
});

// VALIDATE USER PW
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
};

// COUNT DOGS SAVED => use this for leaderboard
userSchema.virtual('dogCount').get(function () {
    return this.savedDogs.length;
})

// COUNT COMMENTS MADE => use this for leaderboard
// userSchema.virtual('commentCount').get(function () {
//     return this.commentsMade.length;
// })

// COUNT POSTS MADE => use this for leaderboard
userSchema.virtual('postCount').get(function () {
    return this.postsMade.length;
})

const User = model('User', userSchema);

module.exports = User;