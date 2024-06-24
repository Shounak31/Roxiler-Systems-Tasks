const Product = require('../models/model');

function getMonthRange(month) {
  const monthNames = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];
  const monthNumber = monthNames.indexOf(month.toLowerCase());

  if (monthNumber === -1) {
    throw new Error("Invalid month");
  }

  const startDate = new Date(2021, monthNumber, 1);
  const endDate = new Date(2022, monthNumber + 1, 0);

  return { startDate, endDate };
}

function handleError(res, errorMessage) {
  return (error) => {
    console.error(errorMessage, error);
    res.status(500).json({ message: 'Internal server error' });
    throw error;
  };
}

async function getStatistics(req, res) {
  try {
    const { month } = req.params;
    const { startDate, endDate } = getMonthRange(month);

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
    handleError(res, 'Error fetching statistics data:',error);
  }
}

async function getPriceRangeData(req, res) {
  try {
    const { month } = req.params;
    const { startDate, endDate } = getMonthRange(month);

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
    handleError(res, 'Error fetching price range data:',error);
  }
}

async function getCategoryCount(req, res) {
  try {
    const { month } = req.params;
    const { startDate, endDate } = getMonthRange(month);

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
    handleError(res, 'Error fetching category count data:',error);
  }
}

module.exports = {
  getStatistics,
  getPriceRangeData,
  getCategoryCount
};
