const mongoose = require('mongoose');
const bookingSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
      date: {
        type: Date,
        required:true
      }
});

module.exports = mongoose.model('booking', bookingSchema)