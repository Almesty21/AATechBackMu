// server/services/songService.js

const Song = require('../models/Song');

// Create a new song
exports.createSong = async (songData) => {
  const song = new Song(songData);
  return await song.save();
};

// Retrieve all songs
exports.getAllSongs = async () => {
  return await Song.find();
};

// Update a song by ID
exports.updateSong = async (songId, updatedData) => {
  return await Song.findByIdAndUpdate(songId, updatedData, { new: true });
};

// Delete a song by ID
exports.deleteSong = async (songId) => {
  return await Song.findByIdAndDelete(songId);
};

// Calculate and send statistics
// server/services/songService.js

exports.getStatistics = async () => {
  try {
    // Calculate the total number of songs
    const totalSongs = await Song.countDocuments();

    // Calculate the number of songs in every genre
    const genreCounts = await Song.aggregate([
      {
        $group: {
          _id: '$genre',
          count: { $sum: 1 },
        },
      },
    ]);

    // Calculate the number of songs & albums each artist has
    const artistAlbumCounts = await Song.aggregate([
      {
        $group: {
          _id: {
            artist: '$artist',
            album: '$album',
          },
          count: { $sum: 1 },
        },
      },
    ]);

    // Calculate total artists
    const totalArtists = artistAlbumCounts.length;

    // Calculate total albums
    const totalAlbums = [...new Set(artistAlbumCounts.map((item) => item._id.album))].length;

    // Calculate the number of songs in each album
    const albumSongCounts = artistAlbumCounts.reduce((acc, item) => {
      const album = item._id.album;
      if (acc[album]) {
        acc[album] += item.count;
      } else {
        acc[album] = item.count;
      }
      return acc;
    }, {});

    // Determine the most popular genre
    let mostPopularGenre = { genre: null, count: 0 };
    for (const genreCount of genreCounts) {
      if (genreCount.count > mostPopularGenre.count) {
        mostPopularGenre = genreCount;
      }
    }

    // Find the artist with the most songs
    let artistWithMostSongs = { artist: null, count: 0 };
    for (const artistCount of artistAlbumCounts) {
      if (artistCount.count > artistWithMostSongs.count) {
        artistWithMostSongs = artistCount;
      }
    }

    // Find the album with the most songs
    let albumWithMostSongs = { album: null, count: 0 };
    for (const [album, count] of Object.entries(albumSongCounts)) {
      if (count > albumWithMostSongs.count) {
        albumWithMostSongs.album = album;
        albumWithMostSongs.count = count;
      }
    }

    // Return all the calculated statistics
    return {
      totalSongs,
      genreCounts,
      artistAlbumCounts,
      totalArtists,
      totalAlbums,
      albumSongCounts,
      mostPopularGenre,
      artistWithMostSongs,
      albumWithMostSongs,
    };
  } catch (error) {
    throw error;
  }
};



