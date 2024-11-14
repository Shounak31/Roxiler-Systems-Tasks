const Product = require("../models/model");

async function listTransactions(req, res) {
  try {
    const { month, search, page = 1, perPage = 10 } = req.query;

    const match = buildMatchObject(month, search);

    const transactions = await Product.find(match)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    res.json(transactions);
  } catch (error) {
    console.error("Error in listTransactions:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

function buildMatchObject(month, search) {
  let match = {};

  if (month) {
    const monthIndex = new Date(Date.parse(`${month} 1, 2020`)).getMonth() + 1;
    match.$expr = { $eq: [{ $month: "$dateOfSale" }, monthIndex] };
  }

  if (search) {
    const searchRegex = new RegExp(search, "i");
    match.$or = [
      { title: { $regex: searchRegex } },
      { description: { $regex: searchRegex } },
    ];
  }

  return match;
}

module.exports = { listTransactions };
