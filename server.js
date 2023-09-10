const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const songRoutes = require('./routes/song.routes');
// console.log("song routes: ", songRoutes);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb+srv://Mihretab:Madonna21@cluster0.3wsehn9.mongodb.net/Addis_Software?retryWrites=true&w=majority" // Replace with your MongoDB URI
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use(cors());
app.use(express.json());
app.use('/api/songs', songRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});