# BCCV2
This Node.js backend project involves creating APIs to interact with a relational database, initialized with data fetched from a third-party API. The project includes functionalities such as listing transactions, providing statistics, generating bar and pie charts, and combining responses from multiple APIs.

## Technologies Used
- Node.js
- Node.js Backend Framework (Express.js)
- Relational Database (SQLite)
- Sequelize (for ORM)
- Axios (for HTTP requests)


## Getting Started

#### Prerequisites
- Node.js
- npm (Node Package Manager)


#### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Sam21sop/Back-End-Challenge.git

2. Navigate to the project directory:
    ```bash
    cd Back-End-Challenge

3. Install dependencies:
    ```bash
    npm install

4. Running the Project
    ```bash
    npm start


#### API Endpoints
1. Initialize Database
    - Endpoint: "/api/database/initialize"
    - Method: GET
    - Description: Initialize the database with seed data from a third-party API.

2. List All Transactions
    - Endpoint: "/api/transactions?month=December"
    - Method: GET
    - Description: List all transactions with support for search and pagination.

3. Statistics
    - Endpoint: "/api/statistics?month=March"
    - Method: GET
    - Description: Get statistics for a selected month, including total sale amount, sold items, and not sold items.

4. Bar Chart
    - Endpoint: "/api/bar-chart?month=april"
    - Method: GET
    - Description: Get data for a bar chart with price ranges and the number of items in each range for a selected month.

5. Pie Chart
    - Endpoint: "/api/pie-chart?month=January"
    - Method: GET
    - Description: Get data for a pie chart with unique categories and the number of items from each category for a selected month.

6. Combined Response
    - Endpoint: "/api/combined-response?month=January"
    - Method: GET
    - Description: Fetch data from multiple APIs, combine responses, and send a final combined JSON response.


#### Instructions
- All APIs take a month parameter, expected to be any month between January to December, matched against the dateOfSale field regardless of the year.
- Pagination is supported on the api/transactions API.
- Search parameters on api/transactions API match on product title/description/price.
- Default pagination values on api/transactions API are page = 1 and per page = 10.
