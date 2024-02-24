import { Router } from 'express';
import { getBarChartData, getMaxMinPrices, getMonthIndex } from '../repository/transactionRepo.js';

const barChartRouter = Router();


// Function to split the price
const splitPriceRange = (totalSize) => {
  const numberOfParts = totalSize%100===0 ? Math.floor(totalSize/100): Math.ceil(totalSize/100);
  const partWidth = 100;
  const ranges = [];

  for (let i = 0; i < numberOfParts; i++) {
    const minValue = i * partWidth + 1;
    const maxValue = (i + 1) * partWidth;
    ranges.push([minValue, maxValue]);
  }

  return ranges;
};


// API for bar chart
barChartRouter.get('/', async (req, res) => {
  try {
    const { month } = req.query;

    // Validate if month parameter is provided
    if (!month) {
      return res.status(400).json({ error: 'Month parameter is required' });
    }

    // get target month index
    const targetMonth = getMonthIndex(month)

    // get max and min price
    const {maxPrice} = await getMaxMinPrices(targetMonth)

    // the price range for specific format
    const priceRanges = splitPriceRange(maxPrice);

    const barChartData = await getBarChartData(targetMonth, priceRanges);

    res.status(200).json({ barChartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default barChartRouter;
