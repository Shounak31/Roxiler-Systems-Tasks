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

async function getStatistics(req, res) {
  try {
    const { month } = req.params;
    const { startDate, endDate } = getMonthRange(month);

    const products = await Product.find({
      dateOfSale: {
        $gte: startDate,
        $lte: endDate
      }
    }).select('price sold'); // Example of using select to limit fields fetched

    const totalSalesAmount = products.reduce((sum, product) => sum + product.price, 0);
    const totalSoldItems = products.filter(product => product.sold).length;
    const totalNotSoldItems = products.filter(product => !product.sold).length;

    return {
      totalSalesAmount,
      totalSoldItems,
      totalNotSoldItems
    };

  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getPriceRangeData(req, res) {
  try {
    const { month } = req.params;
    const { startDate, endDate } = getMonthRange(month);

    const products = await Product.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: null,
          countsByRange: {
            $push: {
              range: {
                $switch: {
                  branches: [
                    { case: { $and: [{ $gte: ['$price', 0] }, { $lte: ['$price', 100] }] }, then: '0 - 100' },
                    // Add other cases for different price ranges
                  ],
                  default: 'Unknown'
                }
              },
              count: { $sum: 1 }
            }
          }
        }
      }
    ]);

    if (products.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    return products[0].countsByRange;

  } catch (error) {
    console.error('Error fetching price range data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCategoryCount(req, res) {
  try {
    const { month } = req.params;
    const { startDate, endDate } = getMonthRange(month);

    const categoryCounts = await Product.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    if (categoryCounts.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    return categoryCounts;

  } catch (error) {
    console.error('Error fetching category count data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getStatistics,
  getPriceRangeData,
  getCategoryCount
};
