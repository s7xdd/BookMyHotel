const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: String,
    img: String,
    content: String,
    location: String,
    amenities: String,
    price: Number,
    smalldescription: String,
    description: String,
    type: String,
    host: {type:mongoose.Schema.Types.ObjectId, ref:'UserHotel'}
}, {
    timestamps: true
})

const PostModel = mongoose.model('PostHotel', PostSchema)

module.exports = PostModel;