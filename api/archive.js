import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = 'endlessflowers';
const collectionName = 'archives';

export default async function handler(req, res) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  if (req.method === 'POST') {
    try {
      const { imageUrl, quote, date } = req.body;
      const result = await collection.insertOne({ imageUrl, quote, date });
      res.status(201).json({ message: 'Saved!', id: result.insertedId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to save archive.' });
    }
  } else if (req.method === 'GET') {
    try {
      const entries = await collection.find().sort({ date: -1 }).toArray();
      res.status(200).json(entries);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch archive.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

