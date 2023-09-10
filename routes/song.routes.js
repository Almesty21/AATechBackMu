const express = require('express');
const router = express.Router();

// Import your song controller
const songController = require('../controllers/song.controller');

// Define your API endpoints
router.get('/get-all-songs', songController.getAllSongs);
router.post('/create-song', songController.createSong);
router.put('/update-song/:id', songController.updateSong);
router.delete('/delete-song/:id', songController.deleteSong);
router.get('/get-statistics', songController.getStatistics);

module.exports = router;