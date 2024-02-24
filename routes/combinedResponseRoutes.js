import processEnvVar from "../utils/processEnvVar.js";
import { Router } from "express";
import axios from "axios";

const PORT = processEnvVar.PORT;
const combinedResponseRouter = Router();

// URLs for the three APIs
const transactionsApiUrl = `http://localhost:${PORT}/api/transactions`;
const statisticsApiUrl = `http://localhost:${PORT}/api/statistics`;
const barChartApiUrl = `http://localhost:${PORT}/api/bar-chart`;
const pieChartApiUrl = `http://localhost:${PORT}/api/pie-chart`;

// API for combined response
combinedResponseRouter.get(`/`, async (req, res) => {
  try {
    const { month } = req.query;

    // Validate if month parameter is provided
    if (!month) {
      return res.status(400).json({ error: `Month parameter is required` });
    }

    // Fetch data from the three APIs concurrently
    const [transactionsResponse, statisticsResponse, barChartResponse, pieChartResponse] = await Promise.all([
      axios.get(`${transactionsApiUrl}?month=${month}`),
      axios.get(`${statisticsApiUrl}?month=${month}`),
      axios.get(`${barChartApiUrl}?month=${month}`),
      axios.get(`${pieChartApiUrl}?month=${month}`),
    ]);

    // Combine the responses into a single JSON
    const combinedResponse = {
      transactions: transactionsResponse.data,
      statistics: statisticsResponse.data,
      barChart: barChartResponse.data,
      pieChart: pieChartResponse.data,
    };

    res.status(200).json(combinedResponse);
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error` });
  }
});


export default combinedResponseRouter;
