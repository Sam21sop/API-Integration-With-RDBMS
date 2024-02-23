import { Router } from 'express';
import Op from 'sequelize';
import transactionModel from '../models/transactionSchema.js';

const statisticsRouter = Router();

// API for statistics
statisticsRouter.get('/', async (req, res) => {
  try {
    const { month } = req.query;

    // Validate if month parameter is provided
    if (!month) {
      return res.status(400).json({ error: 'Month parameter is required' });
    }

    // Calculate total sale amount
    const totalSaleAmount = await transactionModel.sum('price', {
      where: {
        dateOfSale: {
          [Op.between]: [new Date(`${month}-01`), new Date(`${month}-31`)],
        },
        isSold: true,
      },
    });

    console.log("Total Sale amount: ", totalSaleAmount);
    // Calculate total number of sold items
    const totalSoldItems = await transactionModel.count({
      where: {
        dateOfSale: {
          [Op.between]: [new Date(`${month}-01`), new Date(`${month}-31`)],
        },
        isSold: true,
      },
    });

    // Calculate total number of not sold items
    const totalNotSoldItems = await transactionModel.count({
      where: {
        dateOfSale: {
          [Op.between]: [new Date(`${month}-01`), new Date(`${month}-31`)],
        },
        isSold: false,
      },
    });

    res.status(200).json({
      totalSaleAmount: totalSaleAmount || 0,
      totalSoldItems: totalSoldItems || 0,
      totalNotSoldItems: totalNotSoldItems || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default statisticsRouter;
