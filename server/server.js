const express = require("express");
const dotenv = require('dotenv');
const { db } = require("./database/database");
const cors = require('cors');
const bodyParser = require('body-parser');
const { router } = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api/auth', router);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
    db.connect()
        .then(() => {
            console.log('Database connected!');
        })
        .catch((err) => {
            console.error('Connection error', err.message);
        });
});