const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
    },
    flatmate: {
        type: Schema.Types.ObjectId,
        ref: 'Flatmate'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);