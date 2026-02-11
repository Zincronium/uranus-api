const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const database = client.db('uranus_office');
    const repos = await database.collection('repos').find({}).toArray();
    res.status(200).json(repos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
};
