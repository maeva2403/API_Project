```markdown
# API for Countries and Currency Conversion

"Country Currency" is a web application that allows users to access information about different countries, including their currency and the exchange rate of the dollar against that currency. The main objective is to simplify currency conversions for users around the world.

## Features

- Display of country information: common name, official name, capital, region, official language, latitude, longitude, and currency;
- Calculate the amount to convert to dollars into the currency of a selected country;
- User-friendly and intuitive interface for an optimal user experience.

## Technologies Used

- **Frontend**:
  - HTML
  - CSS
  - JavaScript

- **Backend**:
  - Node.js
  - Express.js

- **APIs**:
  - [Rest Countries API](https://restcountries.com/) to obtain information about countries.
  - [Open Exchange Rates API](https://openexchangerates.org/) to obtain exchange rates between currencies.

## Installation and Configuration

Before you begin, make sure you have cloned the project from the Git repository. To launch the application, follow the steps below to install and configure its backend and frontend.

### Backend

1. Navigate to the backend directory :

```bash
cd backend
```

2. Install the necessary dependencies :

```bash
npm install
```

3. Start the server :

```bash
npm run dev
```

4. To access the currency conversion API, use the following URL :

```
http://localhost:3000/api/convert
```

5. To access the API for information about a specific country, use the following URL, replacing `{countryName}` with the desired country's name :

```
http://localhost:3000/api/country?name={countryName}
```

### Frontend

1. Navigate to the frontend directory :

```bash
cd frontend
```

2. Install the necessary dependencies :

```bash
npm install
```

3. Launch the application :

```bash
npm run dev
```

4. Open your browser and go to the following URL :

```
http://localhost:3000
```

By following these steps, you'll be able to properly install and configure both the backend and frontend of the application to start working on it

## API Key Management

To secure your API key and keep it out of your source code, you can use a `.env`file. Here's how to proceed :

1. Navigate to the backend directory of your project using the following command in your terminal :
   
```bash
cd backend
```

2. Install the necessary packages, including Express.js and dotenv, by running the following command :

```bash
npm install express dotenv --save
```

3. Create a `.env` file at the root of your project using the following command :

```bash
touch .env
```

4. Add your API key to the `.env` file using the following command :

```bash
echo 'APIKEY=votre_clé_d_api'> .env
```

By following these steps, you will secure your API key and be able to use it securely in your application.

## Running Tests

To run the application's tests :

1. Make sure the server is running by executing the following command in your terminal :

```bash
npm run dev
```

2. Navigate to the backend directory :

```bash
cd backend
```

3. Run the following command to launch the tests :

```bash
npm test
```

This will launch the automated tests to verify the proper functioning of the application

## To access Swagger

To access the Swagger documentation of the API :

1. Make sure the server is running by executing the following command in your terminal :

```bash
npm run dev
```

2. Open your browser and go to the following URL :

```
http://localhost:3000/api-docs
```

## Installation of necessary packages

Make sure you have installed the swagger-ui-express and swagger-jsdoc packages by running the following command in your terminal :

```bash
npm install swagger-ui-express swagger-jsdoc --save
```
