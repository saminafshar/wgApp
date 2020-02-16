const {dateToString} = require('../../util/date');
const User = require('../../models/user');
const Flatmate = require('../../models/flatmate');
const Comment = require('../../models/comment');

const transformUser = user => {
    return {
        ...user._doc,
        _id: user.id,
        password: null,
        flatmate: flatmate.bind(this, user.flatmate),
        createdAt: dateToString(user._doc.createdAt),
        updatedAt: dateToString(user._doc.updatedAt),
    }
}

const transformFlatmate = flatmate => {
    return {
        ...flatmate._doc,
        _id: flatmate.id,
        user: user.bind(this, flatmate.user),
        comments: comments.bind(this, flatmate.comments),
        createdAt: dateToString(flatmate._doc.createdAt),
        updatedAt: dateToString(flatmate._doc.updatedAt),
    }
}

const transformComments = comment => {
    return {
        ...comment._doc,
        _id: comment.id,
        createdBy: flatmate.bind(this, comment.createdBy),
        createdAt: dateToString(comment._doc.createdAt),
        updatedAt: dateToString(comment._doc.updatedAt),
    }
}


const user = userId => {
    return User.findById(userId)
        .then(user => {
            return transformUser(user);
        })
        .catch(err => {
            throw err;
        })
}

const flatmate = flatmateId => {
    return Flatmate.findById(flatmateId)
        .then(flatmate => {
            return transformFlatmate(flatmate);
        })
        .catch(err => {
            throw err;
        })
}

const comments = commentIds => {
    return Comment.find({_id: {$in: commentIds}})
        .then(comments => {
            return comments.map(comment => {
                return transformComments(comment);
            })
        }).catch(err => {
            throw err;
        })
}

exports.transformUser = transformUser;
exports.transformFlatmate = transformFlatmate;
exports.transformComments = transformComments;