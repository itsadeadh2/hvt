const { Hero } = require('./model');
const request = require('supertest');
const _ = require('lodash');
const { powerApi, threatApi } = require('../variables');

const post = async (req, res, next) => {
    try {
        const hero = new Hero(req.body);
        await hero.save();
        return res.status(201).send(hero);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}

const getAll = async (req, res, next) => {
    try {
        const heroes = await Hero.find({});
        return res.send(heroes);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}

const getHeroByName = async (req, res, next) => {
    try {
        const hero = await Hero.findOne({ "name":  new RegExp(req.params.name, "i") })
        if (!hero) return res.status(404).send();
        return res.send(hero);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}

const addSuperPower = async (req, res, next) => {
    try {
        const hero = await Hero.findOne({ name: new RegExp(req.params.name, "i") });
        if (!hero) return res.status(404).send({ message: "No hero was found with this name :c" });
        const { body, status } = await request(powerApi).get(`/power/${encodeURI(req.body.power)}`);
        if (status == 404) res.status(400).send({ message: 'The given power doesnt exist!' });
        hero.powers.push(body.name);
        await hero.save();
        let heroObj = _.pick(hero, ["name", "image"]);
        heroObj.powers = [];
        heroObj.powers.push(body);
        return res.send(heroObj);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}

const sendHero = async (req, res, next) => {
    try {
        const hero = await Hero.findOne({ name: new RegExp(req.params.name, "i")});
        if (!hero) return res.status(404).send({ message: "No hero was found with this name :c" });        
        const { status, body } = await request(threatApi).post(`/threat/resolve/${encodeURI(req.params.threat)}`).send(hero);
        return res.status(status).send(body);        
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}

module.exports = {
    post,
    getAll,
    getHeroByName,
    addSuperPower,
    sendHero
}