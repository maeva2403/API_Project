import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/country/:name', async (req, res) => {
    const countryName = req.params.name;
    try {
        // Effectuer une requête à l'API REST Countries
        const response = await axios.get(`https://restcountries.com/v3.1/all`);
        // Extraire les données du premier pays trouvé
        const countries = response.json();
//
      
        // Renvoyer les données du pays en réponse
        res.json(countryData);
    } catch (error) {
        // En cas d'erreur, renvoyer une erreur 500 avec un message d'erreur
        res.status(500).json({ message: 'Erreur lors de la récupération des informations sur le pays' });
    }
});

export default router;
