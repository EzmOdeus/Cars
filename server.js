const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./swagger.json");
const authRoutes = require("./routes/authRoutes");
const serviceCenterRoutes = require("./routes/serviceCenterRoutes");
const fuelStationRoutes = require("./routes/fuelStationRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const bodyParser = require("body-parser");
dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors(

));

app.use("/api/auth", authRoutes);
app.use("/api/service-centers", serviceCenterRoutes);
app.use("/api/fuel-stations", fuelStationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/notifications", notificationRoutes);



// إعداد Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
