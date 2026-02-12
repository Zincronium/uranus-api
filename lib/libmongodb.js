import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb+srv://firstAdmin:domydomy210@uranus.4lpogeu.mongodb.net/?appName=uranus");
const clientPromise = client.connect();

export default clientPromise;
