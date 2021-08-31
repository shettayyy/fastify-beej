import { MongoClient } from 'mongodb';

const startDB = async (): Promise<void> => {
  // Create a new MongoClient
  const client = new MongoClient(process.env.MONGODB_DATABASE_URI || '');

  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db('admin').command({ ping: 1 });

    console.info('====Connected successfully to mongodb server====');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

export default startDB;
