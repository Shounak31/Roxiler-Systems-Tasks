const Product = require('../models/model');

async function getStatistics(req, res) {
  try {
    const { month } = req.params;
    const monthNames = [
      "january", "february", "march", "april", "may", "june",
      "july", "august", "september", "october", "november", "december"
    ];
    const monthNumber = monthNames.indexOf(month.toLowerCase());

    if (monthNumber === -1) {
      return res.status(400).json({ error: "Invalid month" });
    }

    const startDate = new Date(2021, monthNumber, 1);
    const endDate = new Date(2022, monthNumber + 1, 0); 

    const products = await Product.find({
      dateOfSale: {
        $gte: startDate,
        $lte: endDate
      }
    });

    const totalSalesAmount = products.reduce((sum, product) => sum + product.price, 0);
    const totalSoldItems = products.filter(product => product.sold).length;
    const totalNotSoldItems = products.filter(product => !product.sold).length;

    return {
      totalSalesAmount,
      totalSoldItems,
      totalNotSoldItems
    };

  } catch (error) {
    console.error('Error occurred:', error);
    throw error; // Propagate the error to the caller
  }
}

async function getPriceRangeData(req, res) {
  try {
    const { month } = req.params;
    const monthNames = [
      "january", "february", "march", "april", "may", "june",
      "july", "august", "september", "october", "november", "december"
    ];
    const monthNumber = monthNames.indexOf(month.toLowerCase());

    if (monthNumber === -1) {
      return res.status(400).json({ error: "Invalid month" });
    }

    const startDate = new Date(2021, monthNumber, 1);
    const endDate = new Date(2022, monthNumber + 1, 0); 

    const products = await Product.find({
      dateOfSale: {
        $gte: startDate,
        $lte: endDate
      }
    });

    const priceRanges = [
      { range: '0 - 100', min: 0, max: 100 },
      { range: '101 - 200', min: 101, max: 200 },
      { range: '201 - 300', min: 201, max: 300 },
      { range: '301 - 400', min: 301, max: 400 },
      { range: '401 - 500', min: 401, max: 500 },
      { range: '501 - 600', min: 501, max: 600 },
      { range: '601 - 700', min: 601, max: 700 },
      { range: '701 - 800', min: 701, max: 800 },
      { range: '801 - 900', min: 801, max: 900 },
      { range: '901 - above', min: 901, max: Infinity }
    ];

    const countsByRange = priceRanges.map(range => ({ range: range.range, count: 0 }));

    products.forEach(product => {
      const price = product.price;
      for (let i = 0; i < priceRanges.length; i++) {
        if (price >= priceRanges[i].min && price <= priceRanges[i].max) {
          countsByRange[i].count++;
          break;
        }
      }
    });

    return countsByRange;
  } catch (error) {
    console.error('Error fetching price range data:', error);
    throw error; // Propagate the error to the caller
  }
}

async function getCategoryCount(req, res) {
  try {
    const { month } = req.params;
    const monthNames = [
      "january", "february", "march", "april", "may", "june",
      "july", "august", "september", "october", "november", "december"
    ];
    const monthNumber = monthNames.indexOf(month.toLowerCase());

    if (monthNumber === -1) {
      return res.status(400).json({ error: "Invalid month" });
    }

    const startDate = new Date(2021, monthNumber, 1);
    const endDate = new Date(2022, monthNumber + 1, 0); 

    const products = await Product.find({
      dateOfSale: {
        $gte: startDate,
        $lte: endDate
      }
    });

    const categoryCounts = {};

    products.forEach(product => {
      const category = product.category;
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });

    const categoryCountsArray = Object.keys(categoryCounts).map(category => ({
      category,
      count: categoryCounts[category]
    }));

    return categoryCountsArray;

  } catch (error) {
    console.error('Error fetching category count data:', error);
    throw error; // Propagate the error to the caller
  }
}

module.exports = { 
  getStatistics,
  getPriceRangeData,
  getCategoryCount,
};
