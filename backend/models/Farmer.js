const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    village: {
        type: String
    },
    crop: {
        type: String
    },
    phone: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Farmer', farmerSchema);