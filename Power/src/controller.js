const { Power } = require('./model');

const post = async (req, res, next) => {
    try {
        const power  = new Power(req.body);
        await power.save();
        return res.status(201).send(power);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}

const getAll = async (req, res, next) => {
    try {
        const powers = await Power.find({});
        return res.send(powers);
    } catch (error) {
        return res.status(400).send({ message: error.message });                
    }
}

const getByName = async (req, res, next) => {
    try {        
        const power = await Power.findOne({ "name":  new RegExp(req.params.name, "i") })
        if(!power) return res.status(404).send();
        return res.send(power);
    } catch (error) {
        return res.status(400).send({ message: error.message });        
    }
}

module.exports = {
    post,
    getAll,
    getByName
}