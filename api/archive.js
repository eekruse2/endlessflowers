const { MongoClient, ObjectId } = require('mongodb'); // ✅ Added ObjectId

let cachedClient = null;
let cachedDb = null;

const uri = process.env.MONGO_URI;
const dbName = 'endlessflowers';
const collectionName = 'archives';

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

module.exports = async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection(collectionName);

    if (req.method === 'POST') {
      const { imageUrl, quote, date } = req.body;

      if (!imageUrl || !quote || !date) {
        return res.status(400).json({ error: 'Missing fields in request body.' });
      }

      // ✅ Check for duplicates before inserting
      const existing = await collection.findOne({ date, quote });
      if (existing) {
        return res.status(200).json({ message: 'Already saved.' });
      }

      const result = await collection.insertOne({ imageUrl, quote, date });
      return res.status(201).json({ message: 'Saved!', id: result.insertedId });
    }

    if (req.method === 'GET') {
      const entries = await collection.find().sort({ date: -1 }).toArray();
      return res.status(200).json(entries);
    }

    // ✅ NEW: DELETE by ID
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Missing archive ID.' });
      }

      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 1) {
        return res.status(200).json({ message: 'Deleted.' });
      } else {
        return res.status(404).json({ error: 'Entry not found.' });
      }
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



