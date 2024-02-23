import express from 'express';
import Database from './config/database.js';
import transactionRouter from './routes/transactionRoutes.js';
import statisticsRouter from './routes/statisticsRoutes.js';
import barChartRouter from './routes/barChartRoutes.js';
import pieChartRouter from './routes/pieChartRoutes.js';
import combinedResponseRouter from './routes/combinedResponseRoutes.js';

const server = express();

server.use(express.json());

// Sync the models with the database
Database.sync().then(() => {
  console.log('Database synced');
});

// Use routes
server.use('/database', transactionRouter);
server.use('/transactions', transactionRouter);
server.use('/statistics', statisticsRouter);
server.use('/bar-chart', barChartRouter);
server.use('/pie-chart', pieChartRouter);
server.use('/combined-response', combinedResponseRouter);


// export server instance
export default server;