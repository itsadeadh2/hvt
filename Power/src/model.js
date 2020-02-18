const mongoose = require('mongoose');

const powerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }    
})

const Power = mongoose.model('Power', powerSchema);

module.exports = {
    powerSchema,
    Power
}