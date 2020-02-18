 
const mongoose = require('mongoose');

const db = process.env.DB_CONNECTION || 'mongodb://localhost/HeroesDb'

module.exports = () => {  
  mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log(`Connected to database! `));
};