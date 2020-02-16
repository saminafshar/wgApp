const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
        value: {
            type: String,
            required: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "Flatmate"
        }
    },
    {
        timestamps: true
    })

module.exports = new mongoose.model('Comment', commentSchema);