require("dotenv").config();
const express = require("express");
const connectDatabase = require("./controllers/connectDb");
const cors = require("cors");
const Routes = require("./routes/Routes");

const app = express();
const PORT = process.env.PORT || 6060;

connectDatabase(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected Successfully!!!");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use(cors());
app.use(express.json());

app.use("/api", Routes);

app.listen(PORT, () => console.log(`Server Started at Port: ${PORT}`));
