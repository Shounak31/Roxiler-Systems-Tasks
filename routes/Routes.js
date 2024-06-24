const express = require('express');
const { seedDatabase } = require('../controllers/seeddatabase');
const { listTransactions } = require('../controllers/listTransactions');
const { getStatistics, getPriceRangeData, getCategoryCount } = require('../controllers/sales');
const { getCombinedData } = require('../controllers/combinedData');

const router = express.Router();

router.get('/initialize-db', seedDatabase);
router.get('/transactions',listTransactions);
router.get('/statistics/:month', getStatistics);
router.get('/sales/price-range/:month',getPriceRangeData);
router.get('/sales/category-items/:month', getCategoryCount)
router.get('/sales/combined-data/:month', getCombinedData);


module.exports = router;
