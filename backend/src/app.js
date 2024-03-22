import express from 'express'; 
import logger from 'pino-http'; 
import countriesRoutes from './routes/countries.js'; 
import deviseRoutes from './routes/devise.js'; 
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();

// Swagger options object
const swaggerOptions = {
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'Express API for Countries and Currency Conversion',
        version: '2.0',
        description: 'An API to fetch primary information about a country and convert dollars to the country\'s currency'
      },
      servers: [
        {
          url: 'http://localhost:3000'
        }
      ],
    },
    apis: ['./src/routes/countries.js', './src/routes/devise.js'],
};

// Generate Swagger documentation
const swaggerDocs = swaggerJSDoc(swaggerOptions);

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

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;
