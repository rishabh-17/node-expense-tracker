const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const expenseRoutes = require('./routes/expenseRoutes')
const app = express();
const sequelize = require('./utils/db')
const User = require('./models/userModel')
const Expense = require('./models/expenseModel')

app.use(cors());
app.use(bodyParser.json());

//  Routes
app.use("/api/auth", userRoutes); 
app.use("/api/expense", expenseRoutes);

User.hasMany(Expense)
Expense.belongsTo(User)

sequelize.sync()

const port = 5000
app.listen(port, () =>{
    console.log(`listening on port http://localhost:${port}`);
});

