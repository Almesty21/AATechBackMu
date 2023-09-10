const mongoose = require('mongoose');

// Define the Song schema
const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
});

// Create the Song model
const Song = mongoose.model('Song', songSchema);

module.exports = Song;
