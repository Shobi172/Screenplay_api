const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  photos: {
    type: Array,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  relations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Relation',
  }],
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
  }],
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
