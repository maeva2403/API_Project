```markdown
# API for Countries and Currency Conversion

Dans le cadre du module "Intégration de données connectées" du Master [MIASH](https://www.univ-montp3.fr/) à l'[UPVM](https://www.univ-montp3.fr/), Maéva Maïo et Houria Sayah avons reçu un projet. Il consiste en la création d'un site web permettant aux utilisateurs de visualiser des informations sur différents pays, y compris leur devise et le taux de change du dollars à cette devise. L'objectif principal est de simplifier les conversions de dollars en une autre monnaie mondiale.

## Technologies Utilisées

- **Frontend**:
  - HTML
  - CSS
  - JavaScript

- **Backend**:
  - Node.js
  - Express.js

- **APIs**:
  - [Rest Countries API](https://restcountries.com/) pour obtenir des informations sur les pays.
  - [Open Exchange Rates API](https://openexchangerates.org/) pour obtenir les taux de change entre les devises.

## Fonctionnalités

- Affichage des informations sur les pays : le nom commun, le nom officiel, la capitale, la région, la langue officielle, la latitude, la longitude et la devise;
- Calculer le montant à convertir  en dollars à la devise d'un pays sélectionné;
- Interface conviviale et intuitive pour une expérience utilisateur optimale.

## Installation et Utilisation

### Backend

1. Accédez au répertoire backend de votre projet en utilisant la commande suivante dans votre terminal :
   
```bash
cd backend
```

2. Installez les dépendances nécessaires :

```bash
npm install
```

3. Lancez le serveur :

```bash
npm run dev
```

4. Pour accéder à l'API de conversion de devises, utilisez l'URL suivante :

```
http://localhost:3000/api/convert
```

5. Pour accéder à l'API d'informations sur un pays spécifique, utilisez l'URL suivante en remplaçant `{countryName}` par le nom du pays :

```
http://localhost:3000/api/country?name={countryName}
```

### Frontend

1. Accédez au répertoire frontend :

```bash
cd frontend
```

2. Installez les dépendances nécessaires :

```bash
npm install
```

3. Lancez l'application :

```bash
npm run dev
```

4. Ouvrez votre navigateur et accédez à l'URL suivante :

```
http://localhost:3000
```

## Gestion des Clés d'API

Pour sécuriser votre clé d'API et la garder hors de votre code source, vous pouvez utiliser un fichier `.env`. Voici comment procéder :

1. Accédez au répertoire backend de votre projet en utilisant la commande suivante dans votre terminal :
   
```bash
cd backend
```

2. Installez les packages nécessaires, y compris Express.js et dotenv, en exécutant la commande suivante :

```bash
npm install express dotenv --save
```

3. Créez un fichier `.env` à la racine de votre projet à l'aide de la commande suivante :

```bash
touch .env
```

4. Ajoutez votre clé d'API au fichier `.env` en utilisant la commande suivante :

```bash
echo 'APIKEY=votre_clé_d_api'> .env
```

En suivant ces étapes, vous sécuriserez votre clé d'API et pourrez l'utiliser de manière sécurisée dans votre application.

## Exécution des tests

Pour exécuter les tests de l'application, suivez ces étapes :

1. Assurez-vous que le serveur est en cours d'exécution en exécutant la commande suivante dans votre terminal :

```bash
npm run dev
```

2. Accédez au répertoire backend :

```bash
cd backend
```

3. Exécutez la commande suivante pour lancer les tests :

```bash
npm test
```

Cela lancera les tests automatisés pour vérifier le bon fonctionnement de l'application.

## Accéder à Swagger

Vous pouvez accéder à la documentation Swagger de l'API en suivant les étapes suivantes :

1. Assurez-vous que le serveur est en cours d'exécution en exécutant la commande suivante dans votre terminal :

```bash
npm run dev
```

2. Ouvrez votre navigateur et accédez à l'URL suivante :

```
http://localhost:3000/api-docs
```

## Installation des packages nécessaires

Assurez-vous d'avoir installé les packages `swagger-ui-express` et `swagger-jsdoc` en exécutant la commande suivante dans votre terminal :

```bash
npm install swagger-ui-express swagger-jsdoc --save
```