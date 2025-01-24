const { db } = require("../database/database");

const DAILY_LIMIT = 40;

async function limitRequests(req, res) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const totalDailyQuery = `
      SELECT 
        (SELECT COUNT(*) FROM itineraries WHERE DATE(created_at) = $1) +
        (SELECT COUNT(*) FROM trip_destinations WHERE DATE(created_at) = $1) +
        (SELECT COUNT(*) FROM trips WHERE DATE(created_at) = $1) as total_daily_requests
    `;

    const totalResult = await db.query(totalDailyQuery, [today]);
    const totalDailyRequests = Number(totalResult.rows[0].total_daily_requests);
    // console.log(totalDailyRequests);

    if (totalDailyRequests >= DAILY_LIMIT) {
      return res.status(403).json({ 
        error: "Daily API request limit reached. Please try again tomorrow." 
      });
    } else {
      return res.status(200).json({ message: "Access to API's Granted!" });
    }
  } catch (error) {
    console.error("Error in limitRequests middleware:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  limitRequests
};