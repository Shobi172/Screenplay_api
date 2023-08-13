const mongoose = require('mongoose');

const relationSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  });

const Relation = mongoose.model('Relation', relationSchema);

module.exports = Relation;
