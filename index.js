const express = require("express");
const cors = require("cors");
const pool = require("./config/dbConfig");
const dotenv = require("dotenv");
const swaggerRoute = require("./swagger");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  }
  if (res) {
    console.log('Connected to database, current time:', res.rows[0].now);
  }
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api-docs", swaggerRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
