const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flatmateSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: false
    },
    movedOut: {
        type: Date,
        required: false,
        default: null,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('Flatmate', flatmateSchema);