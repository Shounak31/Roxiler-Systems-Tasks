const Product = require("../models/model");

async function getStatisticsHelper(monthNumber) {
  const startDate = new Date(2021, monthNumber, 1);
  const endDate = new Date(2022, monthNumber + 1, 0);

  const statistics = await Product.aggregate([
    {
      $match: {
        dateOfSale: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSalesAmount: { $sum: "$price" },
        totalSoldItems: { $sum: { $cond: ["$sold", 1, 0] } },
        totalNotSoldItems: { $sum: { $cond: ["$sold", 0, 1] } },
      },
    },
  ]);

  if (statistics.length > 0) {
    return statistics[0];
  } else {
    return {
      totalSalesAmount: 0,
      totalSoldItems: 0,
      totalNotSoldItems: 0,
    };
  }
}

async function getPriceRangeDataHelper(monthNumber) {
  const startDate = new Date(2021, monthNumber, 1);
  const endDate = new Date(2022, monthNumber + 1, 0);

  return await Product.aggregate([
    {
      $match: {
        dateOfSale: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $bucket: {
        groupBy: "$price",
        boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
        default: "901-above",
        output: {
          count: { $sum: 1 },
        },
      },
    },
  ]);
}

async function getCategoryCountHelper(monthNumber) {
  const startDate = new Date(2021, monthNumber, 1);
  const endDate = new Date(2022, monthNumber + 1, 0);

  return await Product.aggregate([
    {
      $match: {
        dateOfSale: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        category: "$_id",
        count: 1,
        _id: 0,
      },
    },
  ]);
}

// Expose the route handlers and helpers
module.exports = {
  getStatisticsHelper,
  getPriceRangeDataHelper,
  getCategoryCountHelper,
};
