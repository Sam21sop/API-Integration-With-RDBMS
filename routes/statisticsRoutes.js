import { Router } from 'express';
import { getMonthIndex, getStatisticsForMonth } from '../repository/transactionRepo.js';

const statisticsRouter = Router();

// API for statistics
statisticsRouter.get('/', async (req, res) => {
  try {
    const { month } = req.query;

    // Validate if month parameter is provided
    if (!month) {
      return res.status(400).json({ error: 'Month parameter is required' });
    };
    
    // find the month index
    const targetMonth = getMonthIndex(month);

    // based on the target month find statistics
    const statistics = await getStatisticsForMonth(targetMonth);
    
    res.status(200).json(statistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default statisticsRouter;
