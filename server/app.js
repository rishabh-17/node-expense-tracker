require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const path = require("path");
const helmet = require("helmet");
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
const logger = require("morgan");
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(
  logger("common", {
    stream: fs.createWriteStream("./access.log", { flags: "a" }),
  })
);
app.use(logger("dev"));
//  Routes
app.use("/api/auth", userRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/premium", premiumRoutes);
// app.use("api/password", passwordRoutes);
app.use("/", (req, res) => {
  console.log(req.url === "/");
  res.sendFile(
    path.join(__dirname, `client/${req.url !== "/" ? req.url : "index.html"}`)
  );
});

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync();
// app.listen(port, () => {
//   console.log(`listening on port http://localhost:${port}`);
// });

https
  .createServer(
    {
      key: fs.readFileSync("./key.pem"),
      cert: fs.readFileSync("./cert.pem"),
    },
    app
  )
  .listen(process.env.PORT || 5000);
