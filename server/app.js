const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const expenseRoutes = require('./routes/expenseRoutes')
const app = express();
const sequelize = require('./utils/db')

app.use(cors());
app.use(bodyParser.json());

//  Routes
app.use("/api/auth", userRoutes); 
app.use("/api/expense", expenseRoutes);



sequelize.sync()

const port = 5000
app.listen(port, () =>{
    console.log(`listening on port http://localhost:${port}`);
});

