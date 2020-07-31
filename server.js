const express = require('express');
const connectDB = require('./config/db');
const app = express();

//connect Database

connectDB();

//init middleware
app.use(express.json({extended: false}))

app.get('/', (req,res) => res.send('API Running'));
app.use('/api/user', require('./routes/api/user'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/bookings', require('./routes/api/bookings'));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started on port ${PORT}`));