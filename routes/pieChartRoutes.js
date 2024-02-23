import { Router } from 'express';
import { Op } from 'sequelize';
import transactionModel from '../models/transactionSchema.js';

const pieChartRouter = Router();

// API for pie chart
pieChartRouter.get('/', async (req, res) => {
  try {
    const { month } = req.query;

    // Validate if month parameter is provided
    if (!month) {
      return res.status(400).json({ error: 'Month parameter is required' });
    }

    // Fetch unique categories and count of items from each category for the selected month
    const pieChartData = await transactionModel.findAll({
      attributes: [
        'category',
        [transactionModel.sequelize.fn('COUNT', 'id'), 'itemCount'],
      ],
      where: {
        dateOfSale: {
          [Op.between]: [new Date(`${month}-01`), new Date(`${month}-31`)],
        },
      },
      group: ['category'],
    });

    res.status(200).json({ pieChartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default pieChartRouter;
