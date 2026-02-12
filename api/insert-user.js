import clientPromise from '../lib/libmongodb';

export default async function handler(req, res) {
    // 1. SET CORS HEADERS IMMEDIATELY
    const origin = req.headers.origin;

    // 2. Set headers dynamically based on the incoming request
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', origin || '*'); // Echo the origin back
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
        const db = client.db("uranus_office"); // Ensure this matches your Atlas DB name
        const result = await db.collection("users").insertOne(req.body);
        
        return res.status(200).json({ success: true, id: result.insertedId });
    } catch (error) {
        console.error("DB Error:", error);
        return res.status(500).json({ message: error.message });
    }
}
