const request = require('supertest');
const powerApi = process.env.POWER_API || 'http://localhost:8082'
const threatApi = process.env.THREAT_API || 'http://localhost:8083'

// retorna uma threat inativa aleatoria
const getRandomThreat = async (wait) => {
    const { status, body } = await request(threatApi).get('/threat').query({ 'active': false }).send();
    const threat = body[Math.floor(Math.random() * body.length)];
    return threat;
}

// retorna um poder aleatorio
const getRandomPower = async () => {
    const { status, body } = await request(powerApi).get('/power').send();
    const threat = body[Math.floor(Math.random() * body.length)];
    return threat;
}

// adiciona poder necessario na threat
const addPowerToThreat = async (wait) => {
    try {
        const threat = await getRandomThreat();
        const power = await getRandomPower();
        if (threat && power) {
            const { body, status } = await request(threatApi).post(`/threat/addPower/${threat.name}`).send({ power: power.name });    
            console.log(body);
        } else {
            console.log('Nothing to update yet!');
        }        
    } catch (error) {
        console.log(error.message);
    }
    wait();
}

const wait = () => {
    setTimeout(() => {
        addPowerToThreat(wait)
    }, 30000);
}

addPowerToThreat(wait);