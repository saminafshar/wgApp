const Comment = require('../../models/comment');
const Flatmate = require('../../models/flatmate');
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
    createComment: args => {
        const comment = new Comment({
            value: args.commentInput.value,
            createdBy: '5e4951bebdd67d823c4ecf9c'
        })
        let createdComment;
        return comment.save()
            .then(result => {
                createdComment = transformComments(result);
                return Flatmate.findById('5e4951bebdd67d823c4ecf9c');
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

    }
}