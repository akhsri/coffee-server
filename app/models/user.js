const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true,
        unique: true,
        match: new RegExp("^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$")
    },
    addresses: [{
        city: {
            type: String
        },
        pincode: {
            type: String,
            match: new RegExp("^[0-9]{7}$")
        }
    }]
}, {
    timestamps: true
});

const User = mongoose.model('User',userSchema);

module.exports = User;