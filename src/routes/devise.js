import { Router } from 'express';

const router = Router();

router.get('/convert', async (req, res) => {
    const { base } = req.query;

    if (!base) {
        return res.status(400).json({ error: 'Missing parameter: base currency' });
    }

    const url = `https://openexchangerates.org/api/latest.json?app_id=f6f4295c5d4842408952613fbaef9f08`;
    
    try {
        const response = await fetch(url);
        const json = await response.json();
        res.json(json);
    } catch (error) {
        res
            .status(404)
            .json({
            status: 404, 
            message: `Exchange rates not found`
        });
    }
});

export default router;
