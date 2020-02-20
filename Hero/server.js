const express = require('express');

const server = express();

const { port } = require('./variables');

const routes = require('./src/routes');

server.use(express.json());

server.use('/hero', routes);

require('./src/database')();

server.listen(port, () => {
    console.log(`Hero service listening on port ${port}`);
} )