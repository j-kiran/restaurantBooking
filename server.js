const express = require('express');
const connectDB = require('./config/db');
const path = require("path")

const app = express();

//connect Database

connectDB();

//init middleware
app.use(express.json({extended: false}))
app.use('/api/user', require('./routes/api/user'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/bookings', require('./routes/api/bookings'));

//static assets
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started on port ${PORT}`));