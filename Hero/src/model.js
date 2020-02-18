const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    powers: {
        type: [String]        
    },
    image: {
        type: String,
        required: false
    }
});

const Hero = mongoose.model('Hero', heroSchema);

module.exports = {
    heroSchema,
    Hero
}