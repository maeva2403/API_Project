import express from 'express';
import logger from 'pino-http';
import countriesRoutes from './routes/countries.js';
import deviseRoutes from './routes/devise.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger({ level: process.env.NODE_ENV === 'test' ? 'error' : 'info' }));

// first test without api
app.get('/', (req, res) => {
    res.send('Welcome to the homepage'); // Ou tout autre contenu que vous souhaitez renvoyer pour la page d'accueil
});
  
app.use('/api', countriesRoutes);
app.use('/api', deviseRoutes);

export default app;
