const express = require('express');

const server = express();

const port = process.env.PORT || 8081;

const routes = require('./src/routes');

server.use(express.json());

server.use('/hero', routes);

require('./src/database')();

server.listen(port, () => {
    console.log(`Hero service listening on port ${port}`);
} )