// server/controllers/songController.js

const songService = require('../services/song.service');

// Create a new song
exports.createSong = async (req, res) => {
  try {
    const song = await songService.createSong(req.body);
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create song' });
  }
};

// Retrieve all songs
exports.getAllSongs = async (req, res) => {
  try {
    const songs = await songService.getAllSongs();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch songs' });
  }
};

// Update a song by ID
exports.updateSong = async (req, res) => {
  const songId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedSong = await songService.updateSong(songId, updatedData);
    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update song' });
  }
};

// Delete a song by ID
exports.deleteSong = async (req, res) => {
  const songId = req.params.id;

  try {
    await songService.deleteSong(songId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete song' });
  }
};

// Calculate and send statistics
exports.getStatistics = async (req, res) => {
  try {
    const statistics = await songService.getStatistics();

    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ error: 'Unable to calculate statistics' });
  }
};