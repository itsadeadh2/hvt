const express = require('express');

const server = express();

const port = process.env.PORT || 8090;

require('./src/routes')(server);

server.listen(port, () => {
    console.log(`API Gateway Running on Port ${port}`);
})