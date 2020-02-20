 
const mongoose = require('mongoose');

const { db } = require('../variables');

module.exports = () => {  
  mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log(`Connected to database! `));
};