import mongoose from 'mongoose';
import "dotenv/config";

async function connectDB() {
  try {
    const connectionString = process.env.MONGODB_URI; // Obtenez l'URL de connexion à partir des variables d'environnement

    if (!connectionString) {
      throw new Error('MONGODB_URI not found in environment variables');
    }

    await mongoose.connect(connectionString);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Quitte le processus Node.js en cas d'erreur de connexion
  }
}

export default connectDB;
