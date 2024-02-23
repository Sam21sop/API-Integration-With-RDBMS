import sequelize, {Op} from "sequelize";
import transactionModel from "../models/transactionSchema.js";


// Function to get the month index
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










// // Function to find sales in a given month
// export const findSalesInMonth = async (targetMonth, offset, limit=10) => {
//     try {
//         let transactionsRow = await transactionModel.findAll({
//             where: {
//                 [Op.and]: [
//                     sequelize.where(
//                         sequelize.fn("strftime", "%m", sequelize.col("dateOfSale")),
//                         targetMonth
//                     ),
//                 ],
                
//             },
//             offset,
//             limit,
//         });

//         // console.log(`Transactions in month ${targetMonth}:`, transactionsRow);
//         return transactionsRow;
//     } catch (error) {
//         console.error(error);
//     }
// };
