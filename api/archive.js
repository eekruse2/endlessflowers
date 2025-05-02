import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (replace with your MongoDB URI)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Schema
const ArchiveSchema = new mongoose.Schema({
  date: String,
  imageUrl: String,
  quote: String,
});
const Archive = mongoose.model('Archive', ArchiveSchema);

// Save archive
app.post('/api/archive', async (req, res) => {
  try {
    const entry = new Archive(req.body);
    await entry.save();
    res.status(201).json({ message: 'Saved!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save archive.' });
  }
});

// Fetch all archives
app.get('/api/archive', async (req, res) => {
  try {
    const entries = await Archive.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch archive.' });
  }
});

// Start server (port 3000 or your choice)
app.listen(process.env.PORT || 3000, () => {
  console.log('Archive API running');
});

