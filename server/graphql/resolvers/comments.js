const Comment = require('../../models/comment');
const Flatmate = require('../../models/flatmate');
const User = require('../../models/user');
const {transformComments} = require('./merge');

module.exports = {
    comments: () => {
        return Comment.find()
            .then(comments => {
                return comments.map(comment => {
                    return transformComments(comment);
                })
            })
            .catch(err => {
                throw  err;
            });
    },
    createComment: (args, req) => {
        // if (!req.isAuth) {
        //     throw new Error('Unauthenticated')
        // }
        return User.findById(req.userId).then(user => {
            const comment = new Comment({
                value: args.commentInput.value,
                createdBy: user._doc.flatmate
            })
            let createdComment;
            return comment.save()
                .then(result => {
                    createdComment = transformComments(result);
                    return Flatmate.findById(user._doc.flatmate);
                })
                .then(flatmate => {
                    if (!flatmate) {
                        throw new Error('Flatmate not found!')
                    }
                    flatmate.comments.push(comment)
                    return flatmate.save()
                })
                .then(result => {
                    return createdComment;
                })
                .catch(err => {
                    throw err;
                })
        })
            .catch(err => {
                throw err;
            })
    }
};