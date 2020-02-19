const express = require('express');
const heroRoute = require('./routes/hero.route');
// const planetRoute = require('../../routes/planet.routes');
// const userRoute = require('../../routes/user.routes');
// const authRoute = require('../../routes/auth.routes');

module.exports = (app) => {
  app.use(express.json());
  app.use('/hero', heroRoute);
};