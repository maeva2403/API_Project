import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/rates', async (req, res) => {
    try {
        // Effectuer une requête pour obtenir les taux de change actuels
        const response = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=VOTRE_APP_ID_ICI`);
        
        // Extraire les taux de change de la réponse
        const rates = response.data.rates;
        
        // Renvoyer les taux de change en réponse
        res.json(rates);
    } catch (error) {
        // En cas d'erreur, renvoyer une erreur 500 avec un message d'erreur
        res.status(500).json({ message: 'Erreur lors de la récupération des taux de change' });
    }
});

export default router;
