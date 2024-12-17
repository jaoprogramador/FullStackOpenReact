const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: {
    street: String,
    city: String,
  },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
