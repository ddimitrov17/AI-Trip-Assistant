const express = require("express");
const dotenv = require('dotenv');
const { db } = require("./database/database");
const cors = require('cors');
const bodyParser = require('body-parser');
const { router } = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const { tripRouter } = require("./routes/trips.routes");
const { locationsRouter } = require("./routes/location.routes");
const { itineraryRouter } = require("./routes/itinerary.routes");
const { getAllRouter } = require("./routes/getAll.routes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://ai-trip-assistant-frontend.onrender.com',
  credentials: true 
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api/auth', router);
app.use('/api/trips',tripRouter);
app.use('/api/locations',locationsRouter);
app.use('/api/itinerary',itineraryRouter);
app.use('/api/plans',getAllRouter);

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