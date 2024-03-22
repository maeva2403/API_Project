# Projet : Convertisseur de devises

Dans le cadre du module "Intégration de données connectées" du Master [MIASH](https://www.univ-montp3.fr/) à l'[UPVM](https://www.univ-montp3.fr/), Maéva Maïo et Houria Sayah avons reçu un projet. Il consiste en la création d'un site web permettant aux utilisateurs de visualiser des informations sur différents pays, y compris leur devise, ainsi que les taux de change entre cette devise et les autres devises mondiales. L'objectif principal est de simplifier les conversions de devises pour les utilisateurs.

## Fonctionnalités

- Affichage des informations sur les pays : le nom commun, le nom officiel, la capitale, la région, la langue officielle et la devise;
- Affichage des taux de change entre la devise d'un pays sélectionné et les autres devises mondiales;
- Calculer le montant à convertir de la devise d'un pays sélectionné à une autre devise mondiale;
- Interface conviviale et intuitive pour une expérience utilisateur optimale.

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

## Installation et Utilisation

1. Clonez ce dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/votre-utilisateur/nom-du-projet.git
   ```

2. Accédez au répertoire du projet :

   ```bash
   cd nom-du-projet
   ```

3. Installez les dépendances nécessaires :

   ```bash
   npm install
   ```

4. Lancez le serveur :

   ```bash
   npm run dev
   ```

5. Ouvrez votre navigateur et accédez à l'URL suivante :

   ```
   http://localhost:3000
   ```

## Contribuer

Les contributions sont les bienvenues ! Si vous souhaitez contribuer à ce projet, veuillez suivre ces étapes :

1. Fork du projet
2. Créez une nouvelle branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Faites vos modifications
4. Commit de vos modifications (`git commit -am 'Ajout d'une nouvelle fonctionnalité'`)
5. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
6. Créez une nouvelle Pull Request
