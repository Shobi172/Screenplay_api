const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { swaggerUi, swaggerSpec } = require("./swagger");
const connectDB = require("./database");
const characterRoutes = require("./routes/characterRoutes");
const relationRoutes = require("./routes/relationRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const userRoutes = require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Path: ${req.path}`);
  console.log(`Method: ${req.method}`);
  next();
});

app.use("/api/characters", characterRoutes);
app.use("/api/relations", relationRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api", userRoutes);
app.use("/api/reports", reportRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
