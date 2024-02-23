import { Router } from 'express';
import { Op } from 'sequelize';
import transactionModel from '../models/transactionSchema.js';

const barChartRouter = Router();

// API for bar chart
barChartRouter.get('/', async (req, res) => {
  try {
    const { month } = req.query;

    // Validate if month parameter is provided
    if (!month) {
      return res.status(400).json({ error: 'Month parameter is required' });
    }

    // Define price ranges
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Number.MAX_SAFE_INTEGER },
    ];

    // Fetch the count of items in each price range for the selected month
    const barChartData = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await transactionModel.count({
          where: {
            dateOfSale: {
              [Op.between]: [new Date(`${month}-01`), new Date(`${month}-31`)],
            },
            price: {
              [Op.between]: [range.min, range.max],
            },
          },
        });

        return {
          priceRange: `${range.min}-${range.max}`,
          itemCount: count || 0,
        };
      })
    );

    res.status(200).json({ barChartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default barChartRouter;
