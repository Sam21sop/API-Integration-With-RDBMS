import { Router } from "express";
import axios from "axios";
import { Op } from "sequelize";
import transactionModel from "../models/transactionSchema.js";
const transactionRouter = Router();

// API to initialize the database with seed data
transactionRouter.get("/initialize", async (req, res) => {
  try {
    // Fetch data from the third-party API
    const apiURL = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

    const { data } = await axios.get(apiURL);

    
    // Map and transform data as needed before inserting into the database
    const seedData = data.map((item) => ({
      id: item.id,
      title: item.title,
      price: parseFloat(item.price),
      description: item.description,
      category: item.category,
      isSold: item.sold,
      dateOfSale: new Date(item.dateOfSale),
      imageUrl: item.image
    }));

    // Initialize the database with seed data
    await Transaction.bulkCreate(seedData);

    res.status(200).json({ message: "Database initialized successfully" });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: error });
  }
});


// API to list all transactions with search and pagination
transactionRouter.get('/', async (req, res) => {
  try {
    const { month, search, page = 1, perPage = 1 } = req.query;

    // Define the pagination parameters
    const offset = (page - 1) * perPage;
    const limit = parseInt(perPage);

    // Build the where clause for search
    const whereClause = buildSearchWhereClause(search);

    // Add month condition if provided
    if (month) {
      whereClause.dateOfSale = {
        [Op.between]: [new Date(`${month}-01`), new Date(`${month}-31`)],
      };
    }

    // Fetch transactions based on search and pagination
    const transactions = await transactionModel.findAll({
      where: whereClause,
      offset,
      limit,
    });

    res.status(200).json({ transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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


export default transactionRouter;
