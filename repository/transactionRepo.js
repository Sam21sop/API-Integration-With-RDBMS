import sequelize, {Op} from "sequelize";
import transactionModel from "../models/transactionSchema.js";


// month list array
const monthsList = ["", 
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
];

// Function to get the month index
export const getMonthIndex = (month) => {
    const index = monthsList.indexOf(month);
  
    if (index !== -1) {
      // Add zero prefix if the index is between 1 and 9
      const formattedIndex = index < 10 ? `0${index}` : index;
      return formattedIndex;
    }
  
    return false;
};



// Helper function to build the where clause for search
const buildSearchWhereClause = (search) => {
    if (!search) {
      return {}; // Return an empty where clause if no search parameter is provided
    }
  
    return {
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } }, // Case-insensitive search on title
        { description: { [Op.like]: `%${search}%` } }, // Case-insensitive search on description
        { price: { [Op.eq]: parseFloat(search) } }, // Exact match on price (assuming price is a numeric field)
      ],
    };
  };


// Function to find sales in a given month with search and pagination
export const findSalesInMonth = async (targetMonth, search, offset, limit = 10) => {
    try {
      const whereClause = {
        [Op.and]: [
          sequelize.where(
            sequelize.fn("strftime", "%m", sequelize.col("dateOfSale")),
            targetMonth
          ),
        ],
      };
  
      // Add search conditions if provided
      const searchWhereClause = buildSearchWhereClause(search);
      if (Object.keys(searchWhereClause).length > 0) {
        whereClause[Op.and].push(searchWhereClause);
      }
  
      const transactionsRow = await transactionModel.findAll({
        where: whereClause,
        offset,
        limit,
      });
  
      // console.log(`Transactions in month ${targetMonth}:`, transactionsRow);
      return transactionsRow;
    } catch (error) {
      console.error(error);
    }
  };


// Function to get statistics for a given month
export const getStatisticsForMonth = async (targetMonth) => {
  try {
    const statistics = await transactionModel.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('price')), 'totalSaleAmount'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN isSold = 1 THEN 1 ELSE NULL END')), 'totalSoldItems'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN isSold = 0 THEN 1 ELSE NULL END')), 'totalNotSoldItems'],
      ],
      where: {
        [Op.and]: [
          sequelize.where(
            sequelize.fn("strftime", "%m", sequelize.col("dateOfSale")),
            targetMonth
          ),
        ],
      },
    });

    return statistics;
  } catch (error) {
    console.error(error);
  }
};
