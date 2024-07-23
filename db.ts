import mongoose from 'mongoose';

export async function connectDB() {

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to database');
    });

    mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
    });
    
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

connectDB().catch(err => console.log(err));