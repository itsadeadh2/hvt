const express = require('express');
const server = express();
const routes = require('./src/routes');

const { port } = require('./variables')

server.use(express.json());
server.use('/threat', routes);
require('./src/database')();

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})