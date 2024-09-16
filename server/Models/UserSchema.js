const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 4,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    isAdmin: {
        type: Boolean
    }
})

const UserModel = mongoose.model('UserHotel', UserSchema)

module.exports = UserModel;