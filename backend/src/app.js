import express from 'express'; 
import logger from 'pino-http'; 
import countriesRoutes from './routes/countries.js'; 
import deviseRoutes from './routes/devise.js'; 
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();

// Loading Swagger documentation from YAML file
const swaggerDocument = YAML.load('../docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(logger({ level: process.env.NODE_ENV === 'test' ? 'error' : 'info' })); 

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the homepage');
});

// Routes for countries and currency conversion rates
app.use('/api', countriesRoutes);
app.use('/api', deviseRoutes);

export default app;
