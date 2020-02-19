const request = require('request-promise');
const heroApi = process.env.HERO_API || 'http://localhost:8081';

const post = async (req, res, next) => {
    console.log(req.originalUrl);
    const hero = await request({ method: 'POST', uri: `${heroApi}${req.originalUrl}`, body: req.body, json: true });
    res.send(hero);
}

module.exports = {
    post,
}