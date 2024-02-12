import express from 'express';
import logger from 'pino-http';
import countriesRoutes from './routes/countries.js';
import deviseRoutes from './routes/devise.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger({ level: process.env.NODE_ENV === 'test' ? 'error' : 'info' }));

app.use('/', countriesRoutes);
app.use('/', deviseRoutes);

export default app;
