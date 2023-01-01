const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : String,
    email: { type: String, 
        // unique: true
    },
    password: {
        type: String,
        minLength: 3
    }
},
);

const User = mongoose.model('User', UserSchema);
module.exports = User;