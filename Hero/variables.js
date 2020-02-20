module.exports = {
    powerApi: process.env.POWER_API || 'http://localhost:8082/power',
    threatApi: process.env.THREAT_API || 'http://localhost:8083/threat',
    db: process.env.DB_CONNECTION || 'mongodb://localhost/HeroesDb',
    port: process.env.PORT || 3000
}