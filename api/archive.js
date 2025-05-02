import { MongoClient } from 'mongodb';

// Cached connection for re-use between function invocations
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

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection(collectionName);

    if (req.method === 'POST') {
      const { imageUrl, quote, date } = req.body;

      if (!imageUrl || !quote || !date) {
        return res.status(400).json({ error: 'Missing fields in request body.' });
      }

      const result = await collection.insertOne({ imageUrl, quote, date });
      return res.status(201).json({ message: 'Saved!', id: result.insertedId });
    }

    if (req.method === 'GET') {
      const entries = await collection.find().sort({ date: -1 }).toArray();
      return res.status(200).json(entries);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


