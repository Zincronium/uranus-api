import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb+srv://firstAdmin:domydomy210@uranus.4lpogeu.mongodb.net/?appName=uranus";
const client = new MongoClient(uri);

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await client.connect();
    // Force target the 'uranus' database
    const database = client.db('uranus_office'); 
    const collection = database.collection('users'); // Ensure this collection name is correct!
    
    const data = await collection.find({}).toArray();
    
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}
