import mongoose from "mongoose";

export const db = mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/reto1', {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
    .then(conn => {
        console.log('Base de datos conectada en ', conn.connection.host);
        return conn;
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err.message);
        throw err;
    });