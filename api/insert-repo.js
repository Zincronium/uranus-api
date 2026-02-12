import clientPromise from '../lib/mongodb';

export default async function handler(req, res) {
    // 1. SET CORS HEADERS IMMEDIATELY
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // 2. HANDLE PREFLIGHT (CRITICAL FIX)
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Return 200 OK for preflight checks
    }

    // 3. YOUR EXISTING LOGIC
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const client = await clientPromise;
        const db = client.db("your_db_name"); // Ensure this matches your Atlas DB name
        const result = await db.collection("repos").insertOne(req.body);
        
        return res.status(200).json({ success: true, id: result.insertedId });
    } catch (error) {
        console.error("DB Error:", error);
        return res.status(500).json({ message: error.message });
    }
}
