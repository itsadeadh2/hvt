const { Threat } = require('./model');
const { powerApi } = require('../variables');
const request = require('supertest');

const post = async (req, res, next) => {
    try {
        const threat = new Threat(req.body);
        await threat.save();
        return res.status(201).send(threat);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}

const getAll = async (req, res, next) => {
    try {        
        const { active } = req.query;
        let query = {};
        if (active) {
            query.active = active;
        }
        const threats = await Threat.find(query);
        return res.send(threats);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}

const getByName = async (req, res, next) => {
    try {
        const threat = await Threat.findOne({ name: new RegExp(req.params.name, "i") });
        if (!threat) return res.status(404).send({ message: "The threat doesn't exists!" });
        return res.send(threat);
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
}

const updateRequiredPower = async (req, res, next) => {
    try {
        const threat = await Threat.findOne({ name: new RegExp(req.params.name, "i") });
        if (!threat) return res.status(404).send({ message: "The threat doesn't exists!" });
        const { body, status } = await request(powerApi).get(`/power/${req.body.power}`)
        if (status == 404) return res.status(400).send({ message: 'The given power doesnt exist!' });
        threat.requiredPower = body.name;
        threat.active = true;
        await threat.save();
        return res.send(threat);
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
}

const resolve = async (req, res, next) => {
    try {
        const hero = req.body;
        const threat = await Threat.findOne({ name: new RegExp(req.params.name, "i") });
        if (!threat) return res.status(404).send({ message: "The threat doesn't exists!" });
        if (hero.powers.includes(threat.requiredPower)) {
            threat.active = false;
            await threat.save();
            return res.status(200).send({ message: `${hero.name} was able to solve ${threat.name} using the power of ${threat.requiredPower}!` });
        }
        return res.status(200).send({ message: `${hero.name} was not able to solve ${threat.name} because it doesn't have the power of ${threat.requiredPower} :c` })
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
}

module.exports = {
    post,
    getAll,
    getByName,
    updateRequiredPower,
    resolve
}