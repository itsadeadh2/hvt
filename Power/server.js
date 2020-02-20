const express = require('express');
const server = express();
const router = require('./src/routes');

const { port } = require('./variables')

server.use(express.json());

require('./src/database')();
server.use('/power', router);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})