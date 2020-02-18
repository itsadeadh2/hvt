const express = require('express');
const server = express();
const routes = require('./src/routes');

const port = process.env.PORT || 8083;

server.use(express.json());
server.use('/threat', routes);
require('./src/database')();

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})