const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    companyId: {
        type: Number,
        required: true,
        unique: true
    },
    companyPosition: {
        type: String,
        enum: ['Consultant', 'Team manager', 'Product owner', 'Business analyst', 'Student'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);