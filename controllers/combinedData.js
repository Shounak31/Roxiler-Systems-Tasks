const { getStatistics, getPriceRangeData, getCategoryCount } = require('./sales');

async function getCombinedData(req, res) {
  try {
    const { month } = req.params;

    const priceRangeData = await getPriceRangeDataHelper(month);
    const categoryItemCount = await getCategoryItemCountHelper(month);
    const statisticsData = await getStatisticsHelper(month);

    const combinedData = {
      priceRangeData,
      categoryItemCount,
      statisticsData
    };

    res.json(combinedData);
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getStatisticsHelper(month) {
  return await getStatistics({ params: { month } });
}

async function getPriceRangeDataHelper(month) {
  return await getPriceRangeData({ params: { month } });
}

async function getCategoryItemCountHelper(month) {
  return await getCategoryCount({ params: { month } });
}

module.exports = {
  getCombinedData
};
