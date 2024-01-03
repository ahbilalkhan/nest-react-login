import { MongoClient } from "mongodb";


// Get the URI from the environment variable or use a default
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/nest-auth-app';

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    const database = client.db(); // Get the default database

    console.log('Connected to the database');
    return database;
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
}

module.exports = connectToDatabase;
