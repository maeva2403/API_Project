import { Router } from 'express';
import 'dotenv/config';

const router = Router();

const getAllCurrencies = async () => {
    const url = `https://openexchangerates.org/api/latest.json?app_id=${process.env.OPEN_EXCHANGE_RATES_API_KEY}`;
      const options = {
        method : 'GET',
        headers: {
          accept : 'application/json',
      },
    };
  
    const response = await fetch(url, options);
    const json = await response.json();
  
    return json;
}

router.get('/convert', async (req, res) => {
    const base = req.query.base;
    const currencies = await getAllCurrencies();

    if (currencies.length === 0) {
        res
            .status(404)
            .json({
              status: 404, 
              message: `Currency data not found.`
            });
    }
    res.json({
        base : currencies.base,
        rates : currencies.rates
      });
});

export default router;
