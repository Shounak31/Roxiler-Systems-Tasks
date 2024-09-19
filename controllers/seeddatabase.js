const axios = require("axios");
const Product = require("../models/model");
require("dotenv").config();

async function fetchData() {
  try {
    const response = await axios.get(process.env.API);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function seedDatabase() {
  try {
    const data = await fetchData();
    await Product.deleteMany({});
    await Product.insertMany(data);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

module.exports = { seedDatabase };
