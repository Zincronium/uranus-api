import clientPromise from '../lib/libmongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const client = await clientPromise;
  const db = client.db("uranus_office"); //

  try {
    const result = await db.collection("repos").insertOne(req.body); //
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
