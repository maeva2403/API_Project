import { Router } from 'express';

const router = Router();

const getAllCurrencies = async () => {
    const url = `https://openexchangerates.org/api/latest.json?app_id=f6f4295c5d4842408952613fbaef9f08`;
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
