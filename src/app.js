import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { routerUsers } from './routes/users.js';
import { errorHandler, notFound } from './middlewares/error.js';
import { db } from './config/db.js';
import { routerSnnipets } from './routes/snnipets.js';

const app= express();

app.use(express.json());
app.use('/api/v1/users', routerUsers)
app.use('/api/v1/snnipets', routerSnnipets)

app.use(notFound);
app.use(errorHandler)

db.then(() => {
    app.listen(8080,()=>{
        console.log('Servidor corriendo en el puerto:',8080)
    })
}).catch(err => {
    console.error('No se pudo iniciar el servidor:', err.message);
    process.exit(1);
})