const mongoose = require('mongoose');

const threatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    active: {
        type: Boolean,
        default: false
    },
    requiredPower: {
        type: String,
        required: false
    }
})

const Threat = mongoose.model('Threat', threatSchema);

module.exports = {
    threatSchema,
    Threat
}