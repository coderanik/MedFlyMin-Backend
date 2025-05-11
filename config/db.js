import mongoose from "mongoose";

const db = async () => {
    mongoose.connection.on('connected', () => {
        console.log('✅ MongoDB connected');
    });

    await mongoose.connect(process.env.MONGODB_URI);
};

export default db;
