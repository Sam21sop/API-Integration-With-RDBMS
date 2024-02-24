import { Router } from "express";
import axios from "axios";
import { Op } from "sequelize";
import transactionModel from "../models/transactionSchema.js";
import { findSalesInMonth, getMonthIndex } from "../repository/transactionRepo.js";
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
    await transactionModel.bulkCreate(seedData);

    res.status(200).json({ message: "Database initialized successfully" });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: error.message });
  }
});


// API to list all transactions with search and pagination
transactionRouter.get('/', async (req, res) => {
  const {month, search, page = 1, perPage = 10} = req.query;
  let transactions;
  try {

    // Define the pagination parameters
    const offset = (page - 1) * perPage;
    const limit = parseInt(perPage);

    // Add month condition if provided
    if (month) {
      const targetMonth = getMonthIndex(month);
      transactions = await findSalesInMonth(String(targetMonth), search, offset, limit);
    };

    res.status(200).json({ transactions }); 
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default transactionRouter;
