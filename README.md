# MERN Stack Coding Challenge

## Backend Task

### Data Source
- **THIRD PARTY API URL:** `https://s3.amazonaws.com/roxiler.com/product_transaction.json`
- **REQUEST METHOD:** `GET`
- **RESPONSE FORMAT:** `JSON`

### Project Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Run the backend server:**
   ```bash
   nodemon index.js
   ```

4. **Run the frontend server:**
   ```bash
   npm run dev
   ```

### API Endpoints

#### 1. Initialize Database
**GET /api/initialize-db/**
- Fetches JSON data from the third-party API and initializes the database with seed data.
- **Response:** Status message indicating the result of the operation.
- **Example:** `http://localhost:6060/api/initialize-db/`

#### 2. List All Transactions
**GET /api/transactions**
- **Parameters:**
  - `month` (required): The month to filter transactions (expected value is any month between January to December).
  - `search` (optional): Search text to match against product title/description/price.
  - `page` (optional): Page number for pagination (default: 1).
  - `perPage` (optional): Number of records per page (default: 10).
- **Response:** List of product transactions based on search and pagination parameters.
- **Example:** `http://localhost:6060/api/transactions?month=March`

#### 3. Statistics
**GET /api/statistics/:month**
- **Parameters:**
  - `month` (required): The month to filter transactions.
- **Response:**
  - Total sale amount of the selected month.
  - Total number of sold items of the selected month.
  - Total number of not sold items of the selected month.
- **Example:** `http://localhost:6060/api/statistics/november`

#### 4. Bar Chart Data
**GET /api/sales/price-range/:month**
- **Parameters:**
  - `month` (required): The month to filter transactions.
- **Response:** Price range and the number of items in that range for the selected month regardless of the year.
  - Price Ranges:
    - 0 - 100
    - 101 - 200
    - 201 - 300
    - 301 - 400
    - 401 - 500
    - 501 - 600
    - 601 - 700
    - 701 - 800
    - 801 - 900
    - 901 and above
- **Example:** `http://localhost:6060/api/sales/price-range/november`

#### 5. Pie Chart Data
**GET /api/sales/category-items/:month**
- **Parameters:**
  - `month` (required): The month to filter transactions.
- **Response:** Unique categories and the number of items from each category for the selected month.
  - Example:
    - X category: 20 items
    - Y category: 5 items
    - Z category: 3 items
- **Example:** `http://localhost:6060/api/sales/category-items/november`

#### 6. Combined Data
**GET /api/sales/combined-data/:month**
- **Parameters:**
  - `month` (required): The month to filter transactions.
- **Response:** Combined JSON response from the Statistics, Bar Chart, and Pie Chart APIs.
- **Example:** `http://localhost:6060/api/sales/combined-data/november`

### Notes
- Ensure the backend server is running using `nodemon index.js`.
- Use `npm run dev` to run the frontend server.
- Make sure to configure the database connection in the `index.js` file or the appropriate configuration file.

### Contact
For any issues or queries, please contact deshmukhshounak07@gmail.com OR shounakdeshmukh2021.comp@mmcoe.edu.in
