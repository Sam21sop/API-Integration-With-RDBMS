import { Router } from 'express';
import { getMonthIndex, getUniqueCategories } from '../repository/transactionRepo.js';

const pieChartRouter = Router();

// API for pie chart
pieChartRouter.get('/', async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ error: 'Month parameter is required' });
    }

    // Fetch unique categories and count of items from each category for the selected month
    const targetMonth = getMonthIndex(month);

    const pieChartData = await getUniqueCategories(targetMonth);

    res.status(200).json( pieChartData );
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default pieChartRouter;
