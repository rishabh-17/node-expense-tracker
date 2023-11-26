const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const premiumRoutes = require("./routes/premiumRoutes");
// const passwordRoutes = require("./routes/passwordRoutes");
const app = express();
const sequelize = require("./utils/db");
const User = require("./models/userModel");
const Expense = require("./models/expenseModel");
const Order = require("./models/orderModel");
app.use(cors());
app.use(bodyParser.json());

//  Routes
app.use("/api/auth", userRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/premium", premiumRoutes);
// app.use("api/password", passwordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync();

const port = 5000;
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
