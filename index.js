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
//   console.log('Database synced');
});

// Use routes
server.use('/api/database', transactionRouter);
server.use('/api/transactions', transactionRouter);
server.use('/api/statistics', statisticsRouter);
server.use('/api/bar-chart', barChartRouter);
server.use('/api/pie-chart', pieChartRouter);
server.use('/api/combined-response', combinedResponseRouter);

server.get('/', (req, res)=>{
  res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Home</title>
          <style>
              body{
                  margin-top: 5%;
                  padding: 10px;
                  align-items: center;
                  box-sizing: border-box;
                  display: flex;
              }
              .container{
                  text-align: center;
                  margin-left: 40%;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Dashboard</h1>
              <div>
                  <button>
                      <a href="https://api-integration-with-rdbms.onrender.com/api/database/initialize" target="_blank">Initilize DataBase</a>
                  </button>
              </div>
              <div>
                  <button>
                      <a href="http://api-integration-with-rdbms.onrender.com/api/transactions?month=December" target="_blank">Get All Transaction</a>
                  </button>
              </div>
              <br>
              <div>
                  <button>
                      <a href="http://api-integration-with-rdbms.onrender.com/api/statistics?month=March" target="_blank">Get Statistics</a>
                  </button>
              </div>
              <br>
              <div>
                  <button>
                      <a href="http://api-integration-with-rdbms.onrender.com/api/bar-chart?month=March" target="_blank">Get Bar Chart Data</a>
                  </button>
              </div>
              <br>
              <div>
                  <button>
                      <a href="http://api-integration-with-rdbms.onrender.com/api/pie-chart?month=March" target="_blank">Get Pie Chart Data</a>
                  </button>
              </div>
              <br>
              <div>
                  <button>
                      <a href="http://api-integration-with-rdbms.onrender.com/api/combined-response?month=January" target="_blank">Get Combined Response</a>
                  </button>
              </div>
          </div>
      </body>
    </html>
  `)
});

// export server instance
export default server;